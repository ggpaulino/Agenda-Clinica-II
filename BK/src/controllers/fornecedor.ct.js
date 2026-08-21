import pool from '../db.js';

export const listarFornecedores = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM fornecedor`);
    res.json(result.rows);
    } catch (err) {
    res.status(500).json({ erro: err.message });
    }
};

export const criarFornecedor = async (req, res) => {
  try {
    const dados = req.body;
    const result = await pool.query(`INSERT INTO fornecedor (nome, cnpj, telefone, email) VALUES ($1,$2,$3,$4) RETURNING *`,
    [dados.nome, dados.cnpj, dados.telefone, dados.email]);

    res.status(201).json(result.rows[0]);
    
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cnpj, telefone, email } = req.body;
    const result = await pool.query(`UPDATE fornecedor SET nome=$1, cnpj=$2, telefone=$3, email=$4 WHERE id=$5 RETURNING *`,
    [nome, cnpj, telefone, email, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarFornecedor = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM fornecedor WHERE id=$1', [id]);
    res.json({ message: 'Fornecedor removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};