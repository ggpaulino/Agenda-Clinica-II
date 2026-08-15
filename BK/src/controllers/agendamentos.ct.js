import pool from '../db.js';
import { gerarHorarios } from '../utils/agenda/horarios.js';
import { funcionarioLivre } from '../utils/agenda/disponibilidade.js';

export const listarAgendamento = async (req, res) => {
  try {
    const result = await pool.query(`SELECT a.id, a.executor_id, f.nome AS executor_nome, f.cargo AS executor_cargo, 
      a.servico_id, s.nome AS servico_nome,s.duracao_minutos, a.data_hora, a.status, a.animal_id, a.observacoes 
      FROM agendamento a JOIN funcionario f ON f.id = a.executor_id JOIN servico s ON s.id = a.servico_id ORDER BY a.data_hora`);

    res.json(result.rows);
    
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export const listarporCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`select a.* FROM agendamento a JOIN animal an ON an.id=a.animal_id 
      WHERE an.cliente_id = $1`, [id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  } 
};

export const listarFuncionariosDisponiveis = async (req, res) => {
    try {
        const { servico_id } = req.params;
        const result = await pool.query(`SELECT f.id, f.nome, f.cargo FROM funcionario f JOIN servico s
           ON s.cargo_executor = f.cargo WHERE s.id = $1 AND f.ativo = true ORDER BY f.nome`, [servico_id]);
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: err.message });
    }
 };

export const listarHorariosDisponiveis = async (req,res) => {
  try {
    const {servico_id,executor_id, data} = req.query;

      if (!servico_id || !executor_id || !data) {
          return res.status(400).json({ erro: 'Parâmetros obrigatórios.'});
        }

    const servico = await pool.query(`SELECT duracao_minutos FROM servico WHERE id=$1`,[servico_id]);

    if(servico.rows.length===0){
        return res.status(404).json({ erro:'Serviço não encontrado.'});
    }

    const duracao = servico.rows[0].duracao_minutos;
            const agenda = await pool.query(`SELECT a.executor_id, a.data_hora, s.duracao_minutos FROM agendamento a JOIN servico s
                ON s.id = a.servico_id WHERE a.executor_id = $1 AND DATE(a.data_hora) = DATE($2)
                AND a.status IN ('AGENDADO','CONFIRMADO','EM_ATENDIMENTO') ORDER BY data_hora`,[executor_id, data]);

    const horarios = gerarHorarios();
        const horariosDisponiveis = [];
        const funcionario = {
            id: Number(executor_id)
        };

    for (const horario of horarios) {
            if (funcionarioLivre(horario, duracao, funcionario, agenda.rows)) {
                horariosDisponiveis.push({
                    hora: horario
                });
              }
    }
      return res.json(horariosDisponiveis);    
  }
  
   catch(err){
    console.error(err);
    return res.status(500).json({erro:err.message});
  }
};

export const criarAgendamento = async (req, res) => {
  try {
    const { animal_id, servico_id, executor_id, data, hora, observacoes } = req.body;
    const funcionario_id = req.usuario.id;
    const status = 'AGENDADO';
    const data_hora = `${data} ${hora}:00`;
    const result = await pool.query(
      `INSERT INTO agendamento (animal_id, funcionario_id, servico_id, executor_id, data_hora, status, observacoes)
     VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING *`, 
     [animal_id, funcionario_id, servico_id, executor_id, data_hora, status, observacoes]);

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