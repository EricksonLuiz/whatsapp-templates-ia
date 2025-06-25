import React, { useState } from "react";
import Card from "../components/Card";
import { useWebhookSettings } from "../hooks/useWebhookSettings";
import type { WebhookTypes } from "../hooks/useWebhookSettings";
import { sendWebhook } from "../utils/sendWebhook";
import { Link } from "react-router-dom";

const WEBHOOK_LABELS: Record<WebhookTypes, string> = {
  client: "Cliente",
  bm: "Broadcast Manager (BM)",
  category: "Categoria",
  template: "Template",
  phone: "Telefone",
};

const EXAMPLES: Record<WebhookTypes, any> = {
  client: {
    name: "ACME LTDA",
    active: true,
    contractStart: "2024-06-01",
    contractEnd: "2024-12-31",
    value: 1000,
    observation: "Novo cliente importante",
    bmId: "bm_123",
    categoryIds: ["cat_1", "cat_2"],
  },
  bm: {
    name: "João dos Santos",
    email: "joao@email.com",
    password: "****",
    clientIds: ["cliente1", "cliente2"],
  },
  category: {
    name: "Promoções",
    active: true,
  },
  template: {
    name: "Promo de Julho",
    type: "texto",
    app: "whatsapp",
    active: true,
    title: "Título promo",
    body: "Oi {nome} aproveite nossa promoção...",
    footer: "Promo XPTO",
    variables: ["nome"],
    buttons: ["Quero!", "Mais informações"],
    categoryId: "cat_123",
    clientId: "cli_789",
  },
  phone: {
    name: "Canal WhatsApp SP",
    number: "(11) 99999-0001",
    bmId: "bm_001",
    clientId: "cli_001",
  },
};

// EXAMPLES for update and delete: just add id, use same fields as create for update, only id for delete.
function getExample(
  type: WebhookTypes,
  operation: "create" | "update" | "delete"
) {
  if (operation === "create") return EXAMPLES[type];
  if (operation === "update") return { id: `${type}_id`, ...EXAMPLES[type] };
  if (operation === "delete") return { id: `${type}_id` };
  return EXAMPLES[type];
}

function WebhookDocs() {
  const { urls, updateURL, resetURLs } = useWebhookSettings();
  const [type, setType] = useState<WebhookTypes>("client");
  const [operation, setOperation] = useState<"create" | "update" | "delete">(
    "create"
  );
  const [testJson, setTestJson] = useState<string>(
    JSON.stringify(getExample("client", "create"), null, 2)
  );

  function handleTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value as WebhookTypes);
    setTestJson(
      JSON.stringify(
        getExample(e.target.value as WebhookTypes, operation),
        null,
        2
      )
    );
  }

  function handleOperationChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setOperation(e.target.value as "create" | "update" | "delete");
    setTestJson(
      JSON.stringify(
        getExample(type, e.target.value as "create" | "update" | "delete"),
        null,
        2
      )
    );
  }

  async function handleTest(e: React.FormEvent) {
    e.preventDefault();
    if (!urls[type]) {
      alert("Configure a URL do webhook antes de testar.");
      return;
    }
    try {
      const payload = JSON.parse(testJson);
      await sendWebhook(urls[type], payload, type, operation);
    } catch {
      alert("O JSON do payload de teste não é válido.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        Webhooks: Integração com n8n/automação
      </h1>
      <Card className="space-y-6">
        <h2 className="font-semibold text-lg text-white">
          Configuração de URLs
        </h2>
        <form className="space-y-4">
          {(Object.keys(urls) as WebhookTypes[]).map((t) => (
            <div key={t} className="flex items-center space-x-2">
              <label className="min-w-[120px] text-gray-300 font-medium">
                {WEBHOOK_LABELS[t]}
              </label>
              <input
                type="url"
                value={urls[t]}
                onChange={(e) => updateURL(t, e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 outline-none"
                placeholder={`https://n8n.seuservidor.com/webhook/${t}`}
              />
            </div>
          ))}
        </form>
        <button
          className="text-xs underline text-gray-400 hover:text-red-300"
          onClick={resetURLs}
          type="button"
        >
          Limpar todas as URLs
        </button>
      </Card>

      <Card className="space-y-6">
        <h2 className="font-semibold text-lg text-white">
          Exemplo de Payload & Teste de Envio
        </h2>
        <form onSubmit={handleTest} className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <select
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              value={type}
              onChange={handleTypeChange}
            >
              {Object.entries(WEBHOOK_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              value={operation}
              onChange={handleOperationChange}
            >
              <option value="create">Criação</option>
              <option value="update">Edição</option>
              <option value="delete">Exclusão</option>
            </select>
            <span className="text-sm text-gray-400">Tipo & Operação</span>
          </div>
          <textarea
            className="w-full px-3 py-2 h-44 bg-white/10 border border-white/20 rounded-lg text-sm text-white font-mono outline-none resize-none"
            spellCheck={false}
            value={testJson}
            onChange={(e) => setTestJson(e.target.value)}
          />
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg font-medium"
          >
            Enviar Payload de Teste
          </button>
        </form>
        <div className="text-xs text-gray-400">
          O payload é enviado por <b>POST</b> em JSON. <br />
          Exemplo de uso do payload:
          <br />
          <code className="block text-[12px] bg-black/40 rounded px-2 py-1 mt-1 mb-2">{`{
  "entity": "${type}",
  "operation": "${operation}",
  "timestamp": "...",
  ...payload
}`}</code>
          <b>Importante:</b> Como é feito direto do navegador, configure
          segurança no seu n8n!
        </div>
      </Card>
      <Card className="space-y-2 bg-gray-900/50 border-gray-700">
        <h2 className="font-semibold text-lg text-white">Como usar no n8n?</h2>
        <ol className="list-decimal list-inside text-gray-200 space-y-2 text-[15px]">
          <li>
            Crie um node "Webhook" no seu fluxo e copie a URL pública dele.
          </li>
          <li>Cole a URL no campo correspondente acima.</li>
          <li>
            Ao criar, editar ou excluir um cadastro, o payload será enviado
            automaticamente.
          </li>
          <li>
            No n8n, continue o fluxo salvando no Google Sheets, banco, email
            etc.
          </li>
        </ol>
        <div className="pt-3 text-xs text-gray-400">
          Para debug, olhe o histórico do fluxo no n8n. O modo <b>no-cors</b>{" "}
          impede que o status HTTP seja lido no frontend.
          <br />
          Exemplo de integração com Google Sheets: use node "Google Sheets" após
          o Webhook e mapeie os campos desejados.
        </div>
      </Card>
    </div>
  );
}

export default WebhookDocs;
