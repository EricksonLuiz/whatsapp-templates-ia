import React, { createContext, useContext, useState } from 'react';

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
  addClient: (client: Omit<Client, 'id'>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  addBM: (bm: Omit<BM, 'id'>) => void;
  addTemplate: (template: Omit<Template, 'id'>) => void;
  addPhoneNumber: (phone: Omit<PhoneNumber, 'id'>) => void;
  updateTemplate: (id: string, template: Partial<Template>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  getClientCategories: (clientId: string) => Category[];
  getCategoryTemplates: (categoryId: string, clientId: string) => Template[];
  assignCategoryToClient: (clientId: string, categoryId: string) => void;
  unassignCategoryFromClient: (clientId: string, categoryId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Beta Solutions',
      active: true,
      contractStart: '2024-01-01',
      contractEnd: '2024-12-31',
      value: 3000,
      observation: 'Cliente prioritário',
      bmId: '1',
      categoryIds: ['1', '2']
    },
    {
      id: '2',
      name: 'Empresa Alpha',
      active: true,
      contractStart: '2024-01-01',
      contractEnd: '2024-12-31',
      value: 5000,
      observation: 'Cliente premium',
      bmId: '1',
      categoryIds: ['1', '3']
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Vendas',
      active: true,
      aiPrompt: 'Você é um especialista em vendas. Crie templates de mensagens persuasivas para conversão de leads.'
    },
    {
      id: '2',
      name: 'Suporte',
      active: true,
      aiPrompt: 'Você é um especialista em atendimento ao cliente. Crie templates de suporte técnico e atendimento.'
    },
    {
      id: '3',
      name: 'Marketing',
      active: true,
      aiPrompt: 'Você é um especialista em marketing digital. Crie templates para campanhas e promoções.'
    }
  ]);

  const [bms, setBMs] = useState<BM[]>([
    {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@example.com',
      clientIds: ['1', '2']
    },
    {
      id: '2',
      name: 'João Silva',
      email: 'joao@example.com',
      clientIds: ['2']
    }
  ]);

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Boas-vindas',
      type: 'texto',
      app: 'whatsapp',
      active: true,
      title: 'Bem-vindo!',
      body: 'Olá {{nome}}, seja bem-vindo à nossa empresa!',
      footer: 'Equipe de vendas',
      variables: ['nome'],
      buttons: ['Falar com vendedor'],
      categoryId: '1',
      clientId: '1'
    }
  ]);

  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: Date.now().toString() };
    setClients(prev => [...prev, newClient]);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Date.now().toString() };
    setCategories(prev => [...prev, newCategory]);
  };

  const addBM = (bm: Omit<BM, 'id'>) => {
    const newBM = { ...bm, id: Date.now().toString() };
    setBMs(prev => [...prev, newBM]);
  };

  const addTemplate = (template: Omit<Template, 'id'>) => {
    const newTemplate = { ...template, id: Date.now().toString() };
    setTemplates(prev => [...prev, newTemplate]);
  };

  const addPhoneNumber = (phone: Omit<PhoneNumber, 'id'>) => {
    const newPhone = { ...phone, id: Date.now().toString() };
    setPhoneNumbers((prev) => [...prev, newPhone]);
  };

  const updateTemplate = (id: string, template: Partial<Template>) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...template } : t));
  };

  const updateClient = (id: string, client: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...client } : c));
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c));
  };

  const getClientCategories = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return [];
    return categories.filter(cat => client.categoryIds.includes(cat.id));
  };

  const getCategoryTemplates = (categoryId: string, clientId: string) => {
    return templates.filter(t => t.categoryId === categoryId && t.clientId === clientId);
  };

  // Adicionando as funções de atribuição/desatribuição de categorias
  const assignCategoryToClient = (clientId: string, categoryId: string) => {
    setClients(prev =>
      prev.map(c =>
        c.id === clientId && !c.categoryIds.includes(categoryId)
          ? { ...c, categoryIds: [...c.categoryIds, categoryId] }
          : c
      )
    );
  };

  const unassignCategoryFromClient = (clientId: string, categoryId: string) => {
    setClients(prev =>
      prev.map(c =>
        c.id === clientId
          ? { ...c, categoryIds: c.categoryIds.filter(id => id !== categoryId) }
          : c
      )
    );
  };

  return (
    <AppContext.Provider value={{
      clients,
      categories,
      bms,
      templates,
      phoneNumbers,
      addClient,
      addCategory,
      addBM,
      addTemplate,
      addPhoneNumber,
      updateTemplate,
      updateClient,
      updateCategory,
      getClientCategories,
      getCategoryTemplates,
      assignCategoryToClient,
      unassignCategoryFromClient
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
