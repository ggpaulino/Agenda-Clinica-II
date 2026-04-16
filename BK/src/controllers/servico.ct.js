import pool from '../db.js';

export const listarServicos = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM servico`);
    res.json(result.rows);
    } catch (err) {
    res.status(500).json({ erro: err.message });
    }
};

export const listarServicoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM servico WHERE id=$1`, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarServico = async (req, res) => {
  try {
    const dados = req.body;
    const result = await pool.query(`INSERT INTO servico (nome, descricao, preco, duracao_minutos) VALUES ($1,$2,$3,$4) RETURNING *`,
    [dados.nome, dados.descricao, dados.preco, dados.duracao_minutos]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}; 

export const atualizarServico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, duracao_minutos } = req.body;
    const result = await pool.query(`UPDATE servico SET nome=$1, descricao=$2, preco=$3, duracao_minutos=$4 WHERE id=$5 RETURNING *`,
    [nome, descricao, preco, duracao_minutos, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } 
};

export const deletarServico = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM servico WHERE id=$1', [id]);
    res.json({ message: 'Serviço removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};