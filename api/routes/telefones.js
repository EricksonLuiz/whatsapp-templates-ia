const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM telefones ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar telefones" });
  }
});

router.post("/", async (req, res) => {
  const { nome, numero, bm_id, cliente_id, ativo = true } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO telefones (nome, numero, bm_id, cliente_id, ativo)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, numero, bm_id, cliente_id, ativo]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar telefone" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, numero, bm_id, cliente_id, ativo } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE telefones SET nome = $1, numero = $2, bm_id = $3, cliente_id = $4, ativo = $5
       WHERE id = $6 RETURNING *`,
      [nome, numero, bm_id, cliente_id, ativo, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar telefone" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM telefones WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar telefone" });
  }
});

module.exports = router;
