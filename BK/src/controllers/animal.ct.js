import pool from '../db.js';

export const listarAnimais = async (req, res) => {
  try {
    const result = await pool.query(`SELECT a.*, c.nome AS dono FROM animal a JOIN cliente c ON a.cliente_id = c.id`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarAnimal = async (req, res) => {
  try {
    const dados = req.body;
    const result = await pool.query(`INSERT INTO animal (nome, especie, raca, idade, cliente_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [dados.nome, dados.especie, dados.raca, dados.idade, dados.cliente_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, idade } = req.body;
    const result = await pool.query(`UPDATE animal SET nome=$1, especie=$2, raca=$3, idade=$4 WHERE id=$5 RETURNING *`,
    [nome, especie, raca, idade, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarAnimal = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM animal WHERE id=$1', [id]);
    res.json({ message: 'Animal removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};  