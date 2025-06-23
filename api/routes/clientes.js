const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM clientes ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

router.post("/", async (req, res) => {
  const {
    nome,
    ativo = true,
    inicio_contrato,
    fim_contrato,
    valor,
    observacao,
    bm_id,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO clientes (nome, ativo, inicio_contrato, fim_contrato, valor, observacao, bm_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome, ativo, inicio_contrato, fim_contrato, valor, observacao, bm_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar cliente" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    ativo,
    inicio_contrato,
    fim_contrato,
    valor,
    observacao,
    bm_id,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE clientes SET nome = $1, ativo = $2, inicio_contrato = $3, fim_contrato = $4, valor = $5, observacao = $6, bm_id = $7
       WHERE id = $8 RETURNING *`,
      [nome, ativo, inicio_contrato, fim_contrato, valor, observacao, bm_id, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM clientes WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar cliente" });
  }
});

module.exports = router;
