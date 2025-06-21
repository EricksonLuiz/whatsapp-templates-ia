import React, { createContext, useContext, useState, useEffect } from "react";
import {
  buscarClientes,
  buscarCategorias,
  buscarBMs,
  buscarNumeros,
} from "../utils/apiService";

interface Client {
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

interface Category {
  id: string;
  name: string;
  active: boolean;
  aiPrompt?: string;
}

interface BM {
  id: string;
  name: string;
  email: string;
  clientIds: string[];
}

interface Template {
  id: string;
  name: string;
  type: string;
  app: string;
  active: boolean;
  title: string;
  body: string;
  footer: string;
  variables: string[];
  buttons: string[];
  image?: string;
  categoryId: string;
  clientId: string;
}

interface PhoneNumber {
  id: string;
  name: string;
  number: string;
  bmId: string;
  clientId: string;
}

interface AppContextType {
  clients: Client[];
  categories: Category[];
  bms: BM[];
  templates: Template[];
  phoneNumbers: PhoneNumber[];
  getClientCategories: (clientId: string) => Category[];
  getCategoryTemplates: (categoryId: string, clientId: string) => Template[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bms, setBMs] = useState<BM[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);

  useEffect(() => {
    buscarClientes()
      .then(setClients)
      .catch(() => setClients([]));
    buscarCategorias()
      .then(setCategories)
      .catch(() => setCategories([]));
    buscarBMs()
      .then(setBMs)
      .catch(() => setBMs([]));
    buscarNumeros()
      .then(setPhoneNumbers)
      .catch(() => setPhoneNumbers([]));
  }, []);

  const getClientCategories = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (!client) return [];
    return categories.filter((cat) => client.categoryIds.includes(cat.id));
  };

  const getCategoryTemplates = (categoryId: string, clientId: string) => {
    return templates.filter(
      (t) => t.categoryId === categoryId && t.clientId === clientId
    );
  };

  return (
    <AppContext.Provider
      value={{
        clients,
        categories,
        bms,
        templates,
        phoneNumbers,
        getClientCategories,
        getCategoryTemplates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext com contexto não encontrado");
  }
  return context;
};
