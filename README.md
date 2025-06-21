# 📱 Automação de Cadastros & Webhooks

Bem-vindo à aplicação de gerenciamento de templates para comunicação automática, ideal para integração com **n8n**, **Google Sheets** e futuros bancos de dados como **Postgres**.

---

## ✨ O que a aplicação faz?

- **Cadastro & Edição** de Categorias, Clientes, BMs, Telefones e Templates.
- Disparo AUTOMÁTICO de **webhooks** (payloads em JSON) via HTTP POST ao criar, editar ou excluir registros.
- Configuração DINÂMICA dos endpoints de webhook para cada tipo de entidade, ideal para automações com n8n e Google Sheets.
- Interface totalmente em **português** (rotas e payloads amigáveis para integração).
- **Pronta para futura integração com backend real e banco Postgres** (rotas já documentadas e funções preparadas).

---

## 🚀 Principais Funcionalidades

- 📁 **Categorias**: organize e gerencie os tipos de templates.
- 👤 **Clientes**: cadastro de empresas/contatos que recebem disparos.
- 🧑‍💼 **Broadcast Managers (BM)**: gerencie responsáveis pelos envios.
- 📱 **Telefones**: canais de envio (WhatsApp, etc).
- 📝 **Templates**: mensagens automáticas com variáveis e botões.
- 🔗 **Webhooks**: configure uma URL de destino para receber automaticamente os dados de cada entidade ao criar, editar ou apagar.

---

## ⚙️ Como configurar e usar

### 1. **Instalando dependências**

```sh
npm install
```

### 2. **Executando localmente**

```sh
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) ou conforme seu ambiente.

### 3. **Configurando Webhooks**

1. Acesse o menu 🔗 **Webhooks** (na sidebar).
2. Preencha as URLs dos seus endpoints (exemplo: do seu n8n, Google Sheets, etc).
3. Salve ou limpe as URLs conforme necessário.
4. **Teste** a integração enviando um payload de exemplo pela própria tela de WebhookDocs!

#### **Exemplo de payload enviado**

```json
{
  "entity": "categoria",
  "operation": "create", // ou "update", "delete"
  "timestamp": "2024-06-15T12:34:56.789Z",
  "name": "Promoções",
  "active": true
}
```

> O payload é disparado como `POST` e segue o modelo do formulário editado ou cadastrado.

---

### 4. **Preparando para uso com banco Postgres**

- Já existem funções REST geradoras no arquivo `src/utils/apiService.ts` (comentadas!).
- **Quando quiser conectar a um backend real**, basta implementar as rotas `/api/categorias`, `/api/clientes`, `/api/bms`, `/api/telefones`, `/api/templates`.
- Descomente e use as funções prontas (`criarCategoria`, `editarCategoria`, `deletarCategoria`, etc).
- Sugere-se usar [Supabase](https://supabase.com/) para integração fácil com Postgres.

---

## 📚 Estrutura do Projeto

- `src/pages/` — Todas páginas principais (cadastros, webhooks, docs).
- `src/hooks/useWebhookSettings.ts` — Hook para armazenar e usar URLs de webhooks.
- `src/utils/sendWebhook.ts` — Função para envio padrão dos webhooks (POST).
- `src/utils/apiService.ts` — Funções REST para integração futura com backend.
- `src/components/Sidebar.tsx` — Menu lateral com acesso rápido para docs webhooks.

---

## 🛡️ Recomendações de Segurança

- Ao usar webhooks, lembre-se que o navegador envia os dados diretamente — **proteja seus endpoints**!
- No n8n, habilite autenticação básica/tokens/whitelists.
- Nunca exponha endpoints sensíveis publicamente sem proteção adequada.

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Abra um _issue_ ou envie um _pull request_.

---

## 📄 Licença

MIT

# Glass Flow Templates AI

Este projeto consiste em uma aplicação full-stack com frontend em React/Vite e backend em Node.js, utilizando PostgreSQL como banco de dados.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React, Vite, TypeScript, Shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: PostgreSQL
- **Containerização**: Docker e Docker Compose

## 📋 Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## 🔧 Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd glass-flow-templates-ai
   ```

2. **Inicie os containers**

   ```bash
   docker-compose up -d --build
   ```

   Este comando irá:

   - Construir as imagens Docker
   - Iniciar os containers em modo detached
   - Configurar o banco de dados
   - Iniciar o backend
   - Iniciar o frontend

3. **Acesse as aplicações**

   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend (Swagger)**: [http://localhost:3000/api](http://localhost:3000/api)

## 🛠️ Estrutura do Projeto

```
glass-flow-templates-ai/
├── frontend/           # Aplicação React/Vite
├── backend/           # API Node.js/Express
├── docker-compose.yml # Configuração dos containers
├── Dockerfile.frontend # Configuração do container frontend
└── Dockerfile.backend  # Configuração do container backend
```

## 🔍 Troubleshooting

Se encontrar problemas ao iniciar os containers:

1. **Verifique se todos os containers estão rodando**

   ```bash
   docker-compose ps
   ```

2. **Verifique os logs de um serviço específico**

   ```bash
   docker-compose logs frontend
   docker-compose logs backend
   ```

3. **Reconstrua os containers**
   ```bash
   docker-compose down --rmi all -v
   docker-compose up -d --build
   ```

## 📝 Notas Adicionais

- O frontend está configurado para rodar na porta 5173
- O backend está configurado para rodar na porta 3000
- O banco de dados PostgreSQL está configurado para rodar na porta 5432
- Os volumes do Docker são utilizados para desenvolvimento em tempo real

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
