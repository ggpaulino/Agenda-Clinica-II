import pool from '../db.js';

export const listarFuncionarios = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM funcionario`);
    res.json(result.rows);
    } catch (err) {
    res.status(500).json({ erro: err.message });
    }
};

export const listarFuncionarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM funcionario WHERE id=$1`, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarFuncionario = async (req, res) => {
  try {
    const dados = req.body;
    const result = await pool.query(`INSERT INTO funcionario (nome, cargo, salario, telefone) VALUES ($1,$2,$3,$4) RETURNING *`,
    [dados.nome, dados.cargo, dados.salario, dados.telefone]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cargo, salario, telefone } = req.body;
    const result = await pool.query(`UPDATE funcionario SET nome=$1, cargo=$2, salario=$3, telefone=$4 WHERE id=$5 RETURNING *`,
    [nome, cargo, salario, telefone, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM funcionario WHERE id=$1', [id]);
    res.json({ message: 'Funcionário removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};