import pool from '../db.js';

export const listarAnimais = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM animal`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const listarAnimaisPorCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM animal WHERE cliente_id=$1`, [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } 
};

export const criarAnimais = async (req, res) => {
  try {
    const { nome, especie, raca, idade, cliente_id } = req.body;
    const result = await pool.query(`INSERT INTO animal (nome, especie, raca, idade, cliente_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [nome, especie, raca, idade, cliente_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarAnimais = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, especie, raca, idade } = req.body;
    const result = await pool.query(`UPDATE animal SET nome=$1, especie=$2, raca=$3, idade=$4 WHERE id=$5 RETURNING *`,
    [nome, especie, raca, idade, id]);
    //res.json(result.rows[0]);
     if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarAnimais = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM animal WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }
    return res.json({ message: 'Animal removido' });
    
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};  