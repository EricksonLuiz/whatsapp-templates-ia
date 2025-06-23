const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET todas as relações cliente-categoria
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM cliente_categorias ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao buscar relações cliente-categoria" });
  }
});

// POST nova relação cliente-categoria
router.post("/", async (req, res) => {
  const { cliente_id, categoria_id } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO cliente_categorias (cliente_id, categoria_id) VALUES ($1, $2) RETURNING *",
      [cliente_id, categoria_id]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      // unique_violation
      res.status(409).json({ error: "Relação já existe" });
    } else {
      res
        .status(500)
        .json({ error: "Erro ao criar relação cliente-categoria" });
    }
  }
});

// DELETE relação cliente-categoria
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM cliente_categorias WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erro ao deletar relação cliente-categoria" });
  }
});

module.exports = router;
