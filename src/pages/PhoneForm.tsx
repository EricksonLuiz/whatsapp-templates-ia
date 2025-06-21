import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { ArrowLeft, Save, Phone, User } from "lucide-react";
import { useWebhookSettings } from "../hooks/useWebhookSettings";
import { sendWebhook } from "../utils/sendWebhook";

const PhoneForm = () => {
  const { bms, clients, addPhoneNumber } = useApp();
  const { urls } = useWebhookSettings();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    bmId: "",
    clientId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addPhoneNumber(formData);

    // Envia webhook se configurado
    if (urls.phone) {
      await sendWebhook(urls.phone, formData, "phone");
    }

    navigate("/");
  };

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
          <h1 className="text-2xl font-bold text-white">Adicionar Número</h1>
          <p className="text-gray-300">Cadastre um novo número para canais do cliente</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="inline mr-1" />
              Nome para o número *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Apelido (Ex: Canal WhatsApp SP)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone size={16} className="inline mr-1" />
              Número de Telefone *
            </label>
            <input
              type="tel"
              value={formData.number}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, number: e.target.value }))
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="(99) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Broadcast Manager (BM) *
            </label>
            <select
              value={formData.bmId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bmId: e.target.value }))
              }
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer hover:bg-zinc-800"
              required
            >
              <option value="" className="bg-zinc-900 text-white">Selecione um BM</option>
              {bms.map((bm) => (
                <option key={bm.id} value={bm.id} className="bg-zinc-900 text-white">
                  {bm.name} ({bm.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cliente *
            </label>
            <select
              value={formData.clientId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, clientId: e.target.value }))
              }
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-pointer hover:bg-zinc-800"
              required
            >
              <option value="" className="bg-zinc-900 text-white">Selecione um Cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id} className="bg-zinc-900 text-white">
                  {client.name}
                </option>
              ))}
            </select>
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
              <span>Salvar Número</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PhoneForm;
