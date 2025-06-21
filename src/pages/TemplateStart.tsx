
import React, { useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

const TemplateStart = () => {
  const { clients, categories } = useApp();
  const [clientId, setClientId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  // Filtra apenas clientes ativos
  const activeClients = clients.filter(c => c.active);

  // Atualiza as categorias de acordo com o cliente selecionado
  const assignedCategories =
    clientId !== ""
      ? categories.filter((cat) =>
          activeClients.find((c) => c.id === clientId)?.categoryIds.includes(cat.id)
        )
      : [];

  const canContinue = clientId && categoryId;

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue) {
      navigate(`/cliente/${clientId}/categoria/${categoryId}/template/novo`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <h1 className="text-xl font-bold text-white mb-6">Criar Novo Template</h1>
        <form onSubmit={handleGo} className="space-y-5">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Cliente
            </label>
            <select
              value={clientId}
              onChange={(e) => {
                setClientId(e.target.value);
                setCategoryId(""); // reset category ao mudar cliente
              }}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Selecione um cliente</option>
              {activeClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Categoria
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:ring-blue-500 focus:outline-none"
              disabled={!clientId}
              required
            >
              <option value="">
                {clientId ? "Selecione uma categoria" : "Selecione primeiro um cliente"}
              </option>
              {assignedCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={!canContinue}
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors duration-200 disabled:bg-gray-500"
          >
            Iniciar Criação do Template
          </button>
        </form>
      </Card>
    </div>
  );
};

export default TemplateStart;

