
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, UserPlus, Settings, LogOut, Sun, Moon, Folder, MessageSquare, User, FileText, Phone } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Novo Cliente", path: "/cliente/novo" },
    { icon: Folder, label: "Nova Categoria", path: "/categoria/nova" },
    { icon: MessageSquare, label: "Novo BM", path: "/bm/novo" },
    { icon: FileText, label: "Novo Template", path: "/template/novo" },
    { icon: Phone, label: "Cadastrar Número", path: "/numero/novo" },
    ...(user?.isAdmin
      ? [{ icon: UserPlus, label: "Novo Usuário", path: "/usuario/novo" }]
      : []),
    { icon: Settings, label: "Webhooks", path: "/webhook-docs" },  // <-- novo link para docs
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border border-white/20 text-gray-800 dark:text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full backdrop-blur-md bg-white/10 dark:bg-gray-900/20 border-r border-white/20 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/20 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-gray-800 dark:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="pr-12">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                WhatsApp Manager
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Gerencie seus clientes e templates
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto"> {/* Add overflow for scrolling */}
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          {/* Footer */}
          <div className="p-4 border-t border-white/20 space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span>{theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}</span>
            </button>
            
            <div className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
              <User size={16} />
              <span>{user?.login}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
