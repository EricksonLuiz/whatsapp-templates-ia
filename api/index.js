const express = require("express");
const { Pool } = require("pg");
const path = require("path"); // ADICIONE ESTA LINHA

const app = express();
const port = process.env.PORT || 3001;

// Configuração do Pool de Conexão com o PostgreSQL da Vercel
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/api/test", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.status(200).json({ time: rows[0].now });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para servir o front-end
app.use(express.static(path.join(__dirname, "../public"))); // ALTERADO

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
