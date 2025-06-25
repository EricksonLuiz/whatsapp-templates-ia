import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { ArrowLeft, Plus, Bot, Eye, Edit, X } from "lucide-react";
import Card from "../components/Card";

interface Template {
  id: string;
  name: string;
  description: string;
  content: string;
  categoryId: string;
  active: boolean;
  type: string; // Ex: "text", "image", "video"
  app: string; // Ex: "WhatsApp", "Telegram"
  title?: string;
  body?: string;
  footer?: string;
  variables: string[]; // Ex: ["{{name}}", "{{date}}"]
  buttons: string[]; // Ex: ["Button1", "Button2"]
  createdAt?: string;
  updatedAt?: string;
  // ... outros campos
}

const CategoryTemplates = () => {
  const { clientId, categoryId } = useParams<{
    clientId: string;
    categoryId: string;
  }>();
  const { clients, categories, getCategoryTemplates } = useApp();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const client = clients.find((c) => c.id === clientId);
  const category = categories.find((c) => c.id === categoryId);
  const templatesFromApi = getCategoryTemplates(categoryId!, clientId!);

  useEffect(() => {
    fetch(`/api/categorias/${categoryId}/templates`)
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setLoading(false);
      });
  }, [categoryId]);

  if (!client || !category) {
    return (
      <div className="text-center py-12">
        <p className="text-white">Cliente ou categoria não encontrado</p>
      </div>
    );
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/cliente/${clientId}/categorias`)}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {client.name} - {category.name}
          </h1>
          <p className="text-gray-300">Templates da categoria</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <button
          onClick={() =>
            navigate(
              `/cliente/${clientId}/categoria/${categoryId}/template/novo`
            )
          }
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <Plus size={20} />
          <span>Novo Template</span>
        </button>
        <button
          onClick={() =>
            navigate(`/cliente/${clientId}/categoria/${categoryId}/template/ia`)
          }
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <Bot size={20} />
          <span>Criar com IA</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="cursor-pointer hover:bg-white/15 transition-all duration-200"
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {template.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    template.active
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {template.active ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Tipo:</span>
                  <span className="font-medium text-white">
                    {template.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>App:</span>
                  <span className="font-medium text-white">{template.app}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTemplate(template);
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  <Eye size={16} />
                  <span>Ver</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <Card className="text-center py-12">
          <Bot className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum template criado
          </h3>
          <p className="text-gray-400 mb-6">
            Comece criando seu primeiro template
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                navigate(
                  `/cliente/${clientId}/categoria/${categoryId}/template/novo`
                )
              }
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Criar Template
            </button>
            <button
              onClick={() =>
                navigate(
                  `/cliente/${clientId}/categoria/${categoryId}/template/ia`
                )
              }
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Criar com IA
            </button>
          </div>
        </Card>
      )}

      {/* Modal de visualização do template */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  {selectedTemplate.name}
                </h2>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Título
                  </label>
                  <p className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                    {selectedTemplate.title}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Corpo
                  </label>
                  <p className="p-3 bg-white/5 border border-white/10 rounded-lg text-white whitespace-pre-wrap">
                    {selectedTemplate.body}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Rodapé
                  </label>
                  <p className="p-3 bg-white/5 border border-white/10 rounded-lg text-white">
                    {selectedTemplate.footer}
                  </p>
                </div>

                {selectedTemplate.variables.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Variáveis
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map(
                        (variable: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                          >
                            {variable}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}

                {selectedTemplate.buttons.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Botões
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.buttons.map(
                        (button: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                          >
                            {button}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Fechar
                </button>
                <button
                  onClick={() =>
                    navigate(
                      `/cliente/${clientId}/categoria/${categoryId}/template/${selectedTemplate.id}/editar`
                    )
                  }
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <Edit size={20} />
                  <span>Editar</span>
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CategoryTemplates;
