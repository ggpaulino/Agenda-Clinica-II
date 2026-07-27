import { adicionarMinutos,horaDoTimestamp } from './horarios.js';

export function existeSobreposicao(inicioDesejado,fimDesejado,inicioExistente,fimExistente)
{
    return ( inicioDesejado < fimExistente  &&   fimDesejado > inicioExistente);
}

export function funcionarioLivre(horario, duracao, funcionario, agenda)
{ 
    const fimHorario = adicionarMinutos(horario,duracao);
    const agendaFuncionario = agenda.filter( a => a.executor_id === funcionario.id);

    for(const agendamento of agendaFuncionario){
        const inicioExistente = horaDoTimestamp(agendamento.data_hora);
        const fimExistente = adicionarMinutos(inicioExistente, agendamento.duracao_minutos);

        if (existeSobreposicao (horario,fimHorario,inicioExistente,fimExistente))
            {
               return false;
            }
        }
    return true;
}