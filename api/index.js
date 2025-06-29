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

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "Servidor funcionando!",
    timestamp: new Date().toISOString(),
    database: process.env.POSTGRES_URL ? "Configurado" : "Não configurado",
  });
});

app.use(express.static(path.join(__dirname, "../public")));

module.exports = app;
