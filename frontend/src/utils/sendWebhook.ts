import { toast } from "../hooks/use-toast";

export async function sendWebhook(
  url: string,
  data: any,
  entity: string,
  operation: "create" | "update" | "delete" = "create"
) {
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        entity,
        operation,
        timestamp: new Date().toISOString(),
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    });
    toast({
      title: "Webhook enviado",
      description:
        "Os dados foram enviados para o webhook configurado (" +
        operation +
        "). No modo no-cors não é possível confirmar o status da resposta.",
    });
  } catch (err) {
    toast({
      title: "Erro ao enviar webhook",
      description:
        "Não foi possível enviar o webhook. Veja o console para detalhes.",
      variant: "destructive",
    });
    console.error("Erro ao enviar webhook:", err);
  }
}
