import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Folder } from 'lucide-react';
import Card from '../components/Card';
import { Switch } from '../components/ui/switch';
import { useWebhookSettings } from '../hooks/useWebhookSettings';
import { sendWebhook } from '../utils/sendWebhook';

const CategoryEdit = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { categories, updateCategory } = useApp();
  const navigate = useNavigate();
  const { urls } = useWebhookSettings();
  
  const category = categories.find(c => c.id === categoryId);
  
  const [formData, setFormData] = useState({
    name: '',
    active: true,
    aiPrompt: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        active: category.active,
        aiPrompt: category.aiPrompt || ''
      });
    }
  }, [category]);

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-white">Categoria não encontrada</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    updateCategory(categoryId!, formData);

    // Envia webhook se configurado
    if (urls.category) {
      await sendWebhook(urls.category, { id: categoryId, ...formData }, "category", "update");
    }
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Editar Categoria</h1>
          <p className="text-gray-300">Altere os dados da categoria</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Folder size={16} className="inline mr-1" />
              Nome da Categoria *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome da categoria"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              Status
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">
                {formData.active ? 'Ativo' : 'Inativo'}
              </span>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Save size={20} />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CategoryEdit;
