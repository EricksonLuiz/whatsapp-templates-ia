const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM templates ORDER BY criado_em DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar templates" });
  }
});

router.post("/", async (req, res) => {
  const {
    nome,
    tipo,
    aplicativo,
    ativo = true,
    titulo,
    corpo,
    rodape,
    variaveis,
    botoes,
    imagem_url,
    categoria_id,
    cliente_id,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO templates
        (nome, tipo, aplicativo, ativo, titulo, corpo, rodape, variaveis, botoes, imagem_url, categoria_id, cliente_id)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        nome,
        tipo,
        aplicativo,
        ativo,
        titulo,
        corpo,
        rodape,
        variaveis,
        botoes,
        imagem_url,
        categoria_id,
        cliente_id,
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar template" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nome,
    tipo,
    aplicativo,
    ativo,
    titulo,
    corpo,
    rodape,
    variaveis,
    botoes,
    imagem_url,
    categoria_id,
    cliente_id,
  } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE templates SET
        nome = $1, tipo = $2, aplicativo = $3, ativo = $4, titulo = $5, corpo = $6, rodape = $7,
        variaveis = $8, botoes = $9, imagem_url = $10, categoria_id = $11, cliente_id = $12
       WHERE id = $13 RETURNING *`,
      [
        nome,
        tipo,
        aplicativo,
        ativo,
        titulo,
        corpo,
        rodape,
        variaveis,
        botoes,
        imagem_url,
        categoria_id,
        cliente_id,
        id,
      ]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar template" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM templates WHERE id = $1", [id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar template" });
  }
});

module.exports = router;
