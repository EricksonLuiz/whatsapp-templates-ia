/**
 * Serviço de API para integração futura com backend real (Postgres, etc).
 * Todas as rotas estão em português e seguem convenções REST:
 * - POST   /api/entidade   (criação)
 * - PUT    /api/entidade/:id  (edição)
 * - DELETE /api/entidade/:id  (remoção)
 *
 * Para usar, basta descomentar os fetch e chamar no lugar adequado do seu app.
 */

export async function criarCategoria(data: any) {
  // return await fetch("/api/categorias", { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function editarCategoria(id: string, data: any) {
  // return await fetch(`/api/categorias/${id}`, { method: "PUT", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function deletarCategoria(id: string) {
  // return await fetch(`/api/categorias/${id}`, { method: "DELETE" });
}

// --- CLIENTES ---
export async function criarCliente(data: any) {
  // return await fetch("/api/clientes", { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function editarCliente(id: string, data: any) {
  // return await fetch(`/api/clientes/${id}`, { method: "PUT", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function deletarCliente(id: string) {
  // return await fetch(`/api/clientes/${id}`, { method: "DELETE" });
}

export async function buscarClientes() {
  const res = await fetch("/api/clientes");
  if (!res.ok) throw new Error("Erro ao buscar clientes");
  return res.json();
}

// --- BMs ---
export async function criarBM(data: any) {
  // return await fetch("/api/bms", { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function editarBM(id: string, data: any) {
  // return await fetch(`/api/bms/${id}`, { method: "PUT", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function deletarBM(id: string) {
  // return await fetch(`/api/bms/${id}`, { method: "DELETE" });
}

// --- TELEFONES ---
export async function criarTelefone(data: any) {
  // return await fetch("/api/telefones", { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function editarTelefone(id: string, data: any) {
  // return await fetch(`/api/telefones/${id}`, { method: "PUT", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function deletarTelefone(id: string) {
  // return await fetch(`/api/telefones/${id}`, { method: "DELETE" });
}

// --- TEMPLATES ---
export async function criarTemplate(data: any) {
  // return await fetch("/api/templates", { method: "POST", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function editarTemplate(id: string, data: any) {
  // return await fetch(`/api/templates/${id}`, { method: "PUT", body: JSON.stringify(data), headers: {"Content-Type": "application/json"} });
}

export async function deletarTemplate(id: string) {
  // return await fetch(`/api/templates/${id}`, { method: "DELETE" });
}

export async function buscarCategorias() {
  const res = await fetch("/api/categorias");
  if (!res.ok) throw new Error("Erro ao buscar categorias");
  return res.json();
}

export async function buscarBMs() {
  const res = await fetch("/api/bms");
  if (!res.ok) throw new Error("Erro ao buscar BMs");
  return res.json();
}

export async function buscarNumeros() {
  const res = await fetch("/api/numeros");
  if (!res.ok) throw new Error("Erro ao buscar números");
  return res.json();
}

/**
 * OBS:
 * - Estas funções estão comentadas para evitar erros se chamadas sem backend configurado.
 * - Quando implementar o backend, basta remover os comentários "//" antes de cada fetch.
 * - As rotas são exemplos e podem ser ajustadas conforme a sua implementação.
 * - Use Postgres, Supabase ou backend de sua escolha com os mesmos endpoints.
 */
