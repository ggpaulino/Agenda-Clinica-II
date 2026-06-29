import pool from '../db.js';

export const listarAgendamento = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM agendamento ORDER BY data ASC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const listarporCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM agendamento WHERE cliente_id=$1 ORDER BY data ASC`, [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } 
};

export const criarAgendamento = async (req, res) => {
  try {
    const { animal_id, funcionario_id, servico_id, data_hora, status, observacoes } = req.body;
    const result = await pool.query(`INSERT INTO agendamento (animal_id, funcionario_id, servico_id, data_hora, status, observacoes)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [animal_id, funcionario_id, servico_id, data_hora, status, observacoes]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const atualizarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(`UPDATE agendamento SET status=$1 WHERE id=$2 RETURNING *`, [status, id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const deletarAgendamento = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM agendamento WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Agendamento não encontrado' });
    }
    return res.json({ message: 'Agendamento removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};