import pool from '../db.js';

export const listarAgendamento = async (req, res) => {
  try {
    const result = await pool.query(`SELECT a.*, an.nome AS animal, s.nome AS servico FROM agendamento a
    JOIN animal an ON a.animal_id = an.id JOIN servico s ON a.servico_id = s.id`);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export const criarAgendamento = async (req, res) => {
  try {
    const dados = req.body;
    const result = await pool.query(`INSERT INTO agendamento (animal_id, funcionario_id, servico_id, data_hora, status, observacoes)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`, [dados.animal_id, dados.funcionario_id, dados.servico_id, dados.data_hora, dados.status, dados.observacoes]);

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
    await pool.query('DELETE FROM agendamento WHERE id=$1', [id]);
    res.json({ message: 'Agendamento removido' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};