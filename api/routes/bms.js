const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM broadcast_managers ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar BMs" });
  }
});

router.post("/", async (req, res) => {
  const { nome, email, senha, ativo = true } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO broadcast_managers (nome, email, senha, ativo) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, email, senha, ativo]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar BM" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, ativo } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE broadcast_managers SET nome = $1, email = $2, senha = $3, ativo = $4 WHERE id = $5 RETURNING *",
      [nome, email, senha, ativo, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar BM" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM broadcast_managers WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar BM" });
  }
});

module.exports = router;
