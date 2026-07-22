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

export const listarCargos = async (req, res) => {
  try {
    const result = await pool.query(`SELECT DISTINCT UPPER(cargo) AS cargo FROM funcionario 
      WHERE ativo = true AND cargo IS NOT NULL ORDER BY cargo;`);
    res.json(result.rows.map(r => r.cargo));

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
};

export const criarFuncionario = async (req, res) => {
  try {
    const dados = req.body;
    const result = await pool.query(`INSERT INTO funcionario (nome, email, cpf, cargo, salario, telefone) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [dados.nome, dados.email, dados.cpf, dados.cargo, dados.salario, dados.telefone]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarFuncionario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, email, cargo, salario, telefone } = req.body;
    const result = await pool.query(`UPDATE funcionario SET nome=$1, email=$2, cpf=$3, cargo=$4, salario=$5, telefone=$6 WHERE id=$7 RETURNING *`,
    [nome, email, cpf, cargo, salario, telefone, id]);
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