import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, Save, FileText, MessageSquare } from 'lucide-react';
import Card from '../components/Card';
import { useWebhookSettings } from '../hooks/useWebhookSettings';
import { sendWebhook } from '../utils/sendWebhook';

const TemplateForm = () => {
  const { clientId, categoryId } = useParams<{ clientId: string; categoryId: string }>();
  const { addTemplate } = useApp();
  const { urls } = useWebhookSettings();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'texto',
    app: 'whatsapp',
    active: true,
    title: '',
    body: '',
    footer: '',
    variables: [] as string[],
    buttons: [] as string[],
    image: ''
  });

  const [newVariable, setNewVariable] = useState('');
  const [newButton, setNewButton] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    addTemplate({
      ...formData,
      categoryId: categoryId!,
      clientId: clientId!
    });

    // Envia webhook se configurado
    if (urls.template) {
      await sendWebhook(urls.template, {
        ...formData,
        categoryId: categoryId!,
        clientId: clientId!,
      }, "template");
    }
    navigate(`/cliente/${clientId}/categoria/${categoryId}/templates`);
  };

  const addVariable = () => {
    if (newVariable.trim() && !formData.variables.includes(newVariable.trim())) {
      setFormData(prev => ({
        ...prev,
        variables: [...prev.variables, newVariable.trim()]
      }));
      setNewVariable('');
    }
  };

  const removeVariable = (variable: string) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter(v => v !== variable)
    }));
  };

  const addButton = () => {
    if (newButton.trim() && !formData.buttons.includes(newButton.trim())) {
      setFormData(prev => ({
        ...prev,
        buttons: [...prev.buttons, newButton.trim()]
      }));
      setNewButton('');
    }
  };

  const removeButton = (button: string) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.filter(b => b !== button)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/cliente/${clientId}/categoria/${categoryId}/templates`)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Novo Template</h1>
          <p className="text-gray-300">Crie um novo template de mensagem</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <FileText size={16} className="inline mr-1" />
                Nome do Template *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o nome do template"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="texto">Texto</option>
                <option value="imagem">Imagem</option>
                <option value="video">Vídeo</option>
                <option value="audio">Áudio</option>
                <option value="documento">Documento</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MessageSquare size={16} className="inline mr-1" />
                Aplicativo *
              </label>
              <select
                value={formData.app}
                onChange={(e) => setFormData(prev => ({ ...prev, app: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="telegram">Telegram</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.active ? 'true' : 'false'}
                onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.value === 'true' }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
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
              placeholder="Título da mensagem"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Corpo da Mensagem *
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData(prev => ({ ...prev, body: e.target.value }))}
              rows={6}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Digite o corpo da mensagem..."
              required
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
              placeholder="Rodapé da mensagem"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Variáveis
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newVariable}
                onChange={(e) => setNewVariable(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVariable())}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite uma variável (ex: nome, email)"
              />
              <button
                type="button"
                onClick={addVariable}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.variables.map((variable) => (
                <span
                  key={variable}
                  className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                >
                  <span>{`{${variable}}`}</span>
                  <button
                    type="button"
                    onClick={() => removeVariable(variable)}
                    className="text-blue-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Botões
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={newButton}
                onChange={(e) => setNewButton(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addButton())}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Digite o texto do botão"
              />
              <button
                type="button"
                onClick={addButton}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
              >
                Adicionar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.buttons.map((button) => (
                <span
                  key={button}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                >
                  <span>{button}</span>
                  <button
                    type="button"
                    onClick={() => removeButton(button)}
                    className="text-green-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

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
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Save size={20} />
              <span>Salvar Template</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default TemplateForm;
