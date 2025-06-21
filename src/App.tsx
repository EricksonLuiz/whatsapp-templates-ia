import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClientForm from "./pages/ClientForm";
import ClientCategories from "./pages/ClientCategories";
import CategoryTemplates from "./pages/CategoryTemplates";
import TemplateForm from "./pages/TemplateForm";
import TemplateAI from "./pages/TemplateAI";
import CategoryForm from "./pages/CategoryForm";
import BMForm from "./pages/BMForm";
import UserForm from "./pages/UserForm";
import CategoryEdit from "./pages/CategoryEdit";
import TemplateStart from "./pages/TemplateStart";
import PhoneForm from "./pages/PhoneForm";
import WebhookDocs from "./pages/WebhookDocs";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/cliente/novo" element={
          <ProtectedRoute>
            <ClientForm />
          </ProtectedRoute>
        } />
        <Route path="/cliente/:clientId/categorias" element={
          <ProtectedRoute>
            <ClientCategories />
          </ProtectedRoute>
        } />
        <Route path="/cliente/:clientId/categoria/:categoryId/templates" element={
          <ProtectedRoute>
            <CategoryTemplates />
          </ProtectedRoute>
        } />
        <Route path="/cliente/:clientId/categoria/:categoryId/template/novo" element={
          <ProtectedRoute>
            <TemplateForm />
          </ProtectedRoute>
        } />
        <Route path="/cliente/:clientId/categoria/:categoryId/template/ia" element={
          <ProtectedRoute>
            <TemplateAI />
          </ProtectedRoute>
        } />
        <Route path="/categoria/nova" element={
          <ProtectedRoute>
            <CategoryForm />
          </ProtectedRoute>
        } />
        <Route path="/categoria/:categoryId/editar" element={
          <ProtectedRoute>
            <CategoryEdit />
          </ProtectedRoute>
        } />
        <Route path="/bm/novo" element={
          <ProtectedRoute>
            <BMForm />
          </ProtectedRoute>
        } />
        <Route path="/usuario/novo" element={
          <ProtectedRoute>
            <UserForm />
          </ProtectedRoute>
        } />
        <Route path="/template/novo" element={
          <ProtectedRoute>
            <TemplateStart />
          </ProtectedRoute>
        } />
        <Route path="/numero/novo" element={
          <ProtectedRoute>
            <PhoneForm />
          </ProtectedRoute>
        } />
        <Route path="/webhook-docs" element={<WebhookDocs />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
