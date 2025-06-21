
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, Save } from 'lucide-react';
import Card from '../components/Card';
import AIChat from '../components/AIChat';

const TemplateAI = () => {
  const { clientId, categoryId } = useParams<{ clientId: string; categoryId: string }>();
  const { categories, addTemplate } = useApp();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.id === categoryId);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'texto',
    app: 'whatsapp',
    active: true,
    title: '',
    body: '',
    footer: '',
    variables: [] as string[],
    buttons: [] as string[]
  });

  const handleTemplateGenerated = (template: any) => {
    setFormData({
      name: template.name,
      type: template.type,
      app: template.app,
      active: true,
      title: template.title,
      body: template.body,
      footer: template.footer,
      variables: template.variables,
      buttons: template.buttons
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addTemplate({
      ...formData,
      categoryId: categoryId!,
      clientId: clientId!
    });
    
    navigate(`/cliente/${clientId}/categoria/${categoryId}/templates`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/cliente/${clientId}/categoria/${categoryId}/templates`)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Criar Template com IA</h1>
          <p className="text-gray-300">Use a IA para gerar templates automaticamente</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat com IA */}
        <div>
          <AIChat
            prompt={category?.aiPrompt || 'Você é um especialista em criar templates de mensagens.'}
            onTemplateGenerated={handleTemplateGenerated}
          />
        </div>

        {/* Formulário preenchido automaticamente */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Template Gerado</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome do Template
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome será preenchido pela IA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Título será preenchido pela IA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Corpo da Mensagem
              </label>
              <textarea
                value={formData.body}
                onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Corpo será preenchido pela IA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rodapé
              </label>
              <input
                type="text"
                value={formData.footer}
                onChange={(e) => setFormData(prev => ({ ...prev, footer: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Rodapé será preenchido pela IA"
              />
            </div>

            {formData.variables.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Variáveis
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.variables.map((variable, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {formData.buttons.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Botões
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.buttons.map((button, index) => (
                    <span key={index} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      {button}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(`/cliente/${clientId}/categoria/${categoryId}/templates`)}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!formData.name || !formData.body}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                <Save size={20} />
                <span>Salvar Template</span>
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TemplateAI;
