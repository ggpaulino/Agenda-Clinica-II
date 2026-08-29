import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../layouts/layout.component';
import { AgendamentosService } from '../../services/agendamentos.service';
import { ServicosService } from '../../services/servicos.service';
import { ExecutorDisponivel } from '../../models/executor.model';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-agenda',
    imports: [CommonModule, FormsModule, LayoutComponent],
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})

export class AgendaComponent implements OnInit {

    executores: ExecutorDisponivel[] = [];
    servicos: any[] = [];
    executorSelecionado: number | null = null;
    servicoSelecionado: number | null = null;
    agenda: any[] = [];
    hoje = new Date();

    constructor(
        private agendamentosService: AgendamentosService,
        private servicosService: ServicosService,
        private cdr: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit(): void {

    /* A agenda utiliza os próprios agendamentos para descobrir quais executores possuem registros no sistema.
     *
     * Neste momento NÃO montamos a agenda.Primeiro carregamos os executores para permitir a seleção no filtro. */

    this.agendamentosService.listarTodos().subscribe({

        next: (agendamentos: any[]) => {

            console.log('AGENDAMENTOS RECEBIDOS PELA AGENDA:', agendamentos);

            const mapaExecutores = new Map<number, ExecutorDisponivel>();

            for (const agendamento of agendamentos) {

                if (!agendamento.executor_id || !agendamento.executor_nome) {
                    continue;
                }

                const id = Number(agendamento.executor_id);

                if (!mapaExecutores.has(id)) {

                    mapaExecutores.set(id, {
                        id: id,
                        nome: agendamento.executor_nome,
                        cargo: agendamento.executor_cargo
                    } as ExecutorDisponivel);

                }
            }

            this.executores = Array.from(mapaExecutores.values()).sort((a, b) => a.nome.localeCompare(b.nome));

            //console.log('EXECUTORES DISPONÍVEIS PARA FILTRO:', this.executores);
        },

        error: err => {
            console.error('Erro ao carregar executores da agenda:', err);
        }

    });
  }
    
    consultarAgenda(): void {

    if (!this.executorSelecionado) {
        return;
    }

    this.agendamentosService.listarTodos().subscribe({

        next: (agendamentos: any[]) => {

            console.log('AGENDAMENTOS RECEBIDOS PARA O EXECUTOR:',this.executorSelecionado,agendamentos);

            /*Filtra somente os agendamentos do executor selecionado. */
            const agendamentosDoExecutor = agendamentos.filter(
                (agendamento: any) =>
                    Number(agendamento.executor_id) === Number(this.executorSelecionado));

            //console.log('AGENDAMENTOS DO EXECUTOR SELECIONADO:',agendamentosDoExecutor);

            /* Montamos a agenda em um array separado. Só depois de terminar atribuímos esse array
             à propriedade utilizada pelo HTML. */

            const novaAgenda: any[] = [];

            for (let i = 0; i < 8; i++) {

                const data = new Date();

                data.setDate(this.hoje.getDate() + i);

                const dataFormatada = this.formatarData(data);

                const agendamentosDoDia = agendamentosDoExecutor.filter(
                        (agendamento: any) => this.extrairData(agendamento.data_hora) === dataFormatada);

                const horarios = this.montarHorarios(agendamentosDoDia);

                novaAgenda.push({data: dataFormatada,horarios: horarios});
            }

            /* Atribuição única do novo array. */

            this.agenda = novaAgenda;
            this.cdr.detectChanges();

            /*console.log('AGENDA FINAL PARA O HTML:',this.agenda);
            console.log('TOTAL DE DIAS:',this.agenda.length);
            console.log('TOTAL DE HORÁRIOS DO PRIMEIRO DIA:',this.agenda[0]?.horarios?.length);*/
        },

        error: err => {
            console.error('Erro ao carregar agenda:', err);
        }
    });
}





    private montarHorarios( agendamentos: any[]): any[] {

        const horarios: any[] = [];
        for (let hora = 8; hora < 18; hora++) {

            horarios.push(this.criarHorario(`${String(hora).padStart(2, '0')}:00`, agendamentos));
            horarios.push(this.criarHorario(`${String(hora).padStart(2, '0')}:30`, agendamentos));
        }

        return horarios;
    }

    private criarHorario(hora: string, agendamentos: any[]): any {

        const agendamento = agendamentos.find(item => this.horarioOcupado(hora, item));

        if (agendamento) {

            return {hora, disponivel: false, ocupado: true, agendamento_id: agendamento.id, 
                servico_nome: agendamento.servico_nome,duracao_minutos: agendamento.duracao_minutos};
            }

        return { hora, disponivel: true,ocupado: false, agendamento: null};
    }

    private horarioOcupado (horario: string, agendamento: any): boolean {

        const inicioHorario = this.horaParaMinutos(horario);
        const inicioAgendamento = this.horaParaMinutos(this.extrairHora(agendamento.data_hora));

        const duracao = Number( agendamento.duracao_minutos) || 30;
        const fimAgendamento = inicioAgendamento + duracao;
        const fimHorario = inicioHorario + 30;
        return (inicioHorario < fimAgendamento && fimHorario > inicioAgendamento);
    }

    private horaParaMinutos (hora: string): number {

        const [horas, minutos] = hora.split(':').map(Number);
        return horas * 60 + minutos;
    }

    private extrairData (dataHora: string): string {

        return dataHora.substring(0, 10);
    }

    private extrairHora (dataHora: string): string {

        return dataHora.substring(11, 16);
    }

    private formatarData (data: Date): string {

        const ano =data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
    }
    
  voltar() {
    this.router.navigate(['/dashboard']);
  }
}