import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Folder } from "lucide-react";
import Card from "../components/Card";
import { useWebhookSettings } from "../hooks/useWebhookSettings";
import { sendWebhook } from "../utils/sendWebhook";

interface Categoria {
  id: string;
  name: string;
  active: boolean;
  aiPrompt?: string;
}

const CategoryForm = () => {
  const { addCategory } = useApp();
  const { urls } = useWebhookSettings();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categorias")
      .then((res) => res.json())
      .then((data) => {
        setCategorias(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addCategory({ name: nome, active: true });

    // Envia webhook se configurado
    if (urls.category) {
      await sendWebhook(
        urls.category,
        { name: nome, active: true },
        "category",
        "create"
      );
    }

    setNome("");
    navigate("/");
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Nova Categoria</h1>
          <p className="text-gray-300">
            Cadastre uma nova categoria de templates
          </p>
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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome da categoria"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Save size={20} />
              <span>Salvar Categoria</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CategoryForm;
