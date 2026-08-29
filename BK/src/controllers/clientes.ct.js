import pool from '../db.js';

// GET
export const listarCliente = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente WHERE nome ILIKE $1', [`%${req.query.nome || ''}%`] );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

//Listar pelo ID
export const listarClientePorId = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente WHERE id=$1', [req.params.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// POST
export const criarCliente = async (req, res) => {
  try {
    const { nome, cpf, telefone, email } = req.body;
    const result = await pool.query(
        'INSERT INTO cliente (nome,cpf,telefone,email) VALUES ($1, $2, $3, $4) RETURNING *',[nome, cpf, telefone, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// PUT
export const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email } = req.body;

    const result = await pool.query(`UPDATE cliente SET nome=$1, cpf=$2, telefone=$3, email=$4  WHERE id=$5 RETURNING *`,
    [nome, cpf, telefone, email, req.params.id]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

// DELETE
export const deletarCliente = async (req, res) => {
  console.log('DELETE CLIENTE CHEGOU NO CONTROLLER');
  console.log('ID:', req.params.id);
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM cliente WHERE id=$1', [id]);

    res.json({ message: 'Cliente removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};