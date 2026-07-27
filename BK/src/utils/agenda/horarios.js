export const HORA_INICIO = 8;
export const HORA_FIM = 18;
export const INTERVALO_MINUTOS = 30;

export function gerarHorarios() {
    const horarios = [];
    let hora = HORA_INICIO;
    let minuto = 0;
    while (hora < HORA_FIM) {
        horarios.push( `${hora.toString().padStart(2,'0')}:${minuto.toString().padStart(2,'0')}`);
        minuto += INTERVALO_MINUTOS;
        if (minuto >= 60) {
            minuto = 0;
            hora++;
        }
    }
    return horarios;
}

export function adicionarMinutos(horario, minutos) {
    const [hora,minuto] = horario.split(':').map(Number);

    const data = new Date();
    data.setHours(hora);
    data.setMinutes(minuto + minutos);
    return `${data.getHours().toString().padStart(2,'0')}:${data.getMinutes().toString().padStart(2,'0')}`;
}

export function horaDoTimestamp(timestamp){
    return timestamp.toISOString().substring(11,16);
}