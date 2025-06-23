const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM categorias ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar categorias" });
  }
});

router.post("/", async (req, res) => {
  const { nome, ativo = true, prompt_ia } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO categorias (nome, ativo, prompt_ia) VALUES ($1, $2, $3) RETURNING *",
      [nome, ativo, prompt_ia]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, ativo, prompt_ia } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE categorias SET nome = $1, ativo = $2, prompt_ia = $3 WHERE id = $4 RETURNING *",
      [nome, ativo, prompt_ia, id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar categoria" });
  }
});

module.exports = router;
