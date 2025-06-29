const path = require("path");
// A Vercel injeta as variáveis de ambiente automaticamente, mas pode manter para o dev local.
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Rotas separadas (SEM O /api)
app.use("/categorias", require("./routes/categorias"));
app.use("/bms", require("./routes/bms"));
app.use("/clientes", require("./routes/clientes"));
app.use("/telefones", require("./routes/telefones"));
app.use("/templates", require("./routes/templates"));
app.use("/cliente-categorias", require("./routes/cliente_categorias"));

// Rota de health check (SEM O /api)
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
    database: process.env.POSTGRES_URL ? "Configurado" : "Não configurado",
  });
});

app.use(express.static(path.join(__dirname, "../public")));

// Exporta o app para a Vercel
module.exports = app;
