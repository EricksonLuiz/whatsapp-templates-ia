// API para testar internamente´

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Rotas separadas
app.use("/api/categorias", require("./routes/categorias"));
app.use("/api/bms", require("./routes/bms"));
app.use("/api/clientes", require("./routes/clientes"));
app.use("/api/telefones", require("./routes/telefones"));
app.use("/api/templates", require("./routes/templates"));
app.use("/api/cliente-categorias", require("./routes/cliente_categorias"));

// Rota de health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
    database: process.env.POSTGRES_URL ? "Configurado" : "Não configurado",
  });
});

// Servir front-end (se necessário)
app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
