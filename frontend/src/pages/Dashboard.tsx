import React, { useEffect, useState } from "react";
import { useApp } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Plus, Users, TrendingUp, Activity } from "lucide-react";
import Card from "../components/Card";
import { Switch } from "../components/ui/switch";

interface Cliente {
  id: string;
  name: string;
  active: boolean;
  contractStart: string;
  contractEnd: string;
  value: number;
  observation: string;
  bmId: string;
  categoryIds: string[];
}

const Dashboard = () => {
  const { clients, updateClient } = useApp();
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const handleClientStatusToggle = (clientId: string, newStatus: boolean) => {
    updateClient(clientId, { active: newStatus });
  };

  useEffect(() => {
    fetch("/api/clientes")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar clientes");
        return res.json();
      })
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>Erro: {erro}</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Painel de Clientes
          </h1>
          <p className="text-gray-300">Gerencie seus clientes e templates</p>
        </div>
        <button
          onClick={() => navigate("/cliente/novo")}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
        >
          <Plus size={20} />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total de Clientes</p>
              <p className="text-2xl font-bold text-white">{clientes.length}</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="text-blue-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Clientes Ativos</p>
              <p className="text-2xl font-bold text-white">
                {clientes.filter((c) => c.active).length}
              </p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Activity className="text-green-400" size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Valor Total</p>
              <p className="text-2xl font-bold text-white">
                R${" "}
                {clientes
                  .reduce((sum, client) => sum + client.value, 0)
                  .toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <TrendingUp className="text-purple-400" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((client) => (
          <Card
            key={client.id}
            className="hover:bg-white/15 transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/cliente/${client.id}/categorias`)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white hover:text-blue-400 transition-colors">
                  {client.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={client.active}
                    onCheckedChange={(checked) =>
                      handleClientStatusToggle(client.id, checked)
                    }
                  />
                  <span
                    className={`text-xs font-medium ${
                      client.active ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {client.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Valor:</span>
                  <span className="font-medium text-white">
                    R$ {client.value.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contrato:</span>
                  <span className="font-medium text-white">
                    {new Date(client.contractStart).toLocaleDateString("pt-BR")}{" "}
                    - {new Date(client.contractEnd).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              {client.observation && (
                <p className="text-sm text-gray-400 italic">
                  {client.observation}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {clientes.length === 0 && (
        <Card className="text-center py-12">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            Nenhum cliente cadastrado
          </h3>
          <p className="text-gray-400 mb-6">
            Comece adicionando seu primeiro cliente
          </p>
          <button
            onClick={() => navigate("/cliente/novo")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Adicionar Cliente
          </button>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
