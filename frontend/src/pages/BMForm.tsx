import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User, Mail, Lock } from "lucide-react";
import Card from "../components/Card";
import { useWebhookSettings } from "../hooks/useWebhookSettings";
import { sendWebhook } from "../utils/sendWebhook";

interface BM {
  id: string;
  name: string;
  email: string;
  clientIds: string[];
}

const BMForm = () => {
  const { clients, addBM } = useApp();
  const { urls } = useWebhookSettings();
  const navigate = useNavigate();

  const [bms, setBMs] = useState<BM[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bms")
      .then((res) => res.json())
      .then((data) => {
        setBMs(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addBM({ name: nome, email: email, clientIds: [] });
    // Envia webhook se configurado
    if (urls.bm) {
      await sendWebhook(
        urls.bm,
        { name: nome, email: email, clientIds: [] },
        "bm",
        "create"
      );
    }

    navigate("/");
  };

  // const handleClientToggle = (clientId: string) => {
  //   // Implementation of handleClientToggle function
  // };

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
          <h1 className="text-2xl font-bold text-white">Novo BM</h1>
          <p className="text-gray-300">Cadastre um novo Broadcast Manager</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="inline mr-1" />
              Nome *
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome do BM"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail size={16} className="inline mr-1" />
              Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o email do BM"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Clientes Atribuídos
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {clients.map((client) => (
                <label
                  key={client.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200`}
                >
                  <input
                    type="checkbox"
                    checked={false}
                    // onChange={() => handleClientToggle(client.id)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-medium`}>{client.name}</span>
                    <p className="text-xs text-gray-400">
                      R$ {client.value.toLocaleString("pt-BR")} -{" "}
                      {client.active ? "Ativo" : "Inativo"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
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
              <span>Salvar BM</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BMForm;
