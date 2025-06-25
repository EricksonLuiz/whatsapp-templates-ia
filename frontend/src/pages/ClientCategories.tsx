
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, Plus } from 'lucide-react';
import Card from '../components/Card';
import DualListBox from '../components/DualListBox';

const ClientCategories = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const { clients, categories, assignCategoryToClient, unassignCategoryFromClient } = useApp();
  const navigate = useNavigate();

  const client = clients.find(c => c.id === clientId);

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-white">Cliente não encontrado</p>
      </div>
    );
  }

  // Separar as categorias entre disponíveis e atribuídas
  const assignedCategories = categories.filter(cat => client.categoryIds.includes(cat.id));
  const availableCategories = categories.filter(cat => !client.categoryIds.includes(cat.id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{client.name}</h1>
          <p className="text-gray-300">Gerenciar Categorias</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate('/categoria/nova')}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <Plus size={20} />
          <span>Categoria</span>
        </button>
      </div>

      <Card>
        <DualListBox
          leftTitle="Categorias disponíveis"
          rightTitle="Categorias atribuídas ao cliente"
          leftItems={availableCategories}
          rightItems={assignedCategories}
          onAssign={(id) => assignCategoryToClient(client.id, id)}
          onUnassign={(id) => unassignCategoryFromClient(client.id, id)}
        />
      </Card>
    </div>
  );
};

export default ClientCategories;
