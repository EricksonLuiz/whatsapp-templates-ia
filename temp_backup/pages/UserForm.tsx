import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User, Lock, Shield } from "lucide-react";
import Card from "../components/Card";

const UserForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [message, setMessage] = useState("");

  if (!user?.isAdmin) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <Shield className="mx-auto text-red-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">
            Acesso Negado
          </h3>
          <p className="text-gray-400 mb-6">
            Apenas administradores podem cadastrar usuários
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Voltar ao Dashboard
          </button>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("As senhas não coincidem");
      return;
    }

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
          isAdmin: formData.isAdmin,
        }),
      });

      if (response.ok) {
        setMessage("Usuário criado com sucesso!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        const data = await response.json();
        setMessage(data.error || "Erro ao criar usuário");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor");
    }
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
          <h1 className="text-2xl font-bold text-white">Novo Usuário</h1>
          <p className="text-gray-300">Cadastre um novo usuário no sistema</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="inline mr-1" />
              Login *
            </label>
            <input
              type="text"
              value={formData.login}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, login: e.target.value }))
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o login do usuário"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Lock size={16} className="inline mr-1" />
              Senha *
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite a senha do usuário"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Lock size={16} className="inline mr-1" />
              Confirmar Senha *
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirme a senha do usuário"
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAdmin}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isAdmin: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded border border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">
                <Shield size={16} className="inline mr-1" />
                Usuário administrador
              </span>
            </label>
            <p className="text-xs text-gray-400 mt-1 ml-8">
              Administradores podem cadastrar outros usuários e ter acesso
              completo ao sistema
            </p>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.includes("sucesso")
                  ? "bg-green-500/20 border border-green-500/30 text-green-300"
                  : "bg-red-500/20 border border-red-500/30 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

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
              <span>Criar Usuário</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserForm;
