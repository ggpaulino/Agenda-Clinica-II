import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentosService } from '../../services/agendamentos.service';
import { AnimaisService } from '../../services/animais.service';
import { ApiService } from '../../services/api.service';
import { ServicosService } from '../../services/servicos.service';
import { HorarioDisponivel } from '../../models/horario.model';
import { ExecutorDisponivel } from '../../models/executor.model';


@Component({
  standalone: true,
  selector: 'app-agendamentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.component.html'
})


export class AgendamentosComponent implements OnInit {

  clienteId!: number;
  cliente: any;
  animais: any[] = [];

  agendamentos: any[] = [];
  servicos: any[] = [];
  horariosDisponiveis: HorarioDisponivel[] = [];
  executores: ExecutorDisponivel[] = [];
  hoje = new Date().toISOString().split('T')[0];
  mostrarForm = false;

  novoAgendamento = {
  animal_id: null,
  servico_id: null,
  executor_id: null,
  data: '',
  hora: '',
  observacoes: ''
};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private animaisService: AnimaisService,
    private servicosService: ServicosService,
    private agendamentosService: AgendamentosService
  ) {}

  ngOnInit(): void {

    this.clienteId = Number(this.route.snapshot.paramMap.get('id'));

    this.api.listarClientePorId(this.clienteId.toString())
      .subscribe(cliente => this.cliente = cliente);

    this.animaisService.listarPorCliente(this.clienteId)
      .subscribe((data: any) => this.animais = data || []);
    
    this.carregarAgendamentos();

    this.servicosService.listarServicos()
      .subscribe((data: any) => this.servicos = data || []);
    
  }

  carregarAgendamentos() {
    this.agendamentosService.listarPorCliente(this.clienteId)
      .subscribe((data: any) => this.agendamentos = data || []);
  }

  carregarDisponibilidade() {
    if (!this.novoAgendamento.servico_id || !this.novoAgendamento.data) 
      {
        this.horariosDisponiveis = [];
        this.novoAgendamento.hora = '';
        return;
      }

    this.agendamentosService.listarHorariosDisponiveis(this.novoAgendamento.servico_id!, this.novoAgendamento.executor_id!,
      this.novoAgendamento.data).subscribe(
        (horarios: any) => {
            this.horariosDisponiveis = horarios;
            if (!this.horariosDisponiveis.some((h: HorarioDisponivel) => h.hora === this.novoAgendamento.hora)) {
                this.novoAgendamento.hora = '';
            }
        },
        err => {
            console.error(err);
            this.horariosDisponiveis = [];
        }
    );
 }

  onServicoChange(): void {

    this.novoAgendamento.executor_id = null;
    this.novoAgendamento.hora = '';
    this.executores = [];
    this.horariosDisponiveis = [];
    if (!this.novoAgendamento.servico_id) {
        return;
    }
    this.agendamentosService.listarFuncionarios(this.novoAgendamento.servico_id)
        .subscribe({
            next: (data: any) => {
                this.executores = data;
            },
            error: err => console.error(err)
        });
  }

  onDataChange(): void {
    this.novoAgendamento.hora = '';
    this.horariosDisponiveis = [];

    if (!this.novoAgendamento.data || !this.novoAgendamento.executor_id || !this.novoAgendamento.servico_id) {
        return;
    }
    this.carregarHorariosDisponiveis();
  }

  onExecutorChange(): void {

    this.novoAgendamento.hora = '';
    this.horariosDisponiveis = [];
    if (
        !this.novoAgendamento.executor_id ||
        !this.novoAgendamento.data ||
        !this.novoAgendamento.servico_id
    ) {
        return;
    }
    this.carregarHorariosDisponiveis();

}

  horarioSelecionadoValido(): boolean {
        return this.horariosDisponiveis.some((h: any) => h.hora === this.novoAgendamento.hora);
  }


  abrirFormulario() {
    this.mostrarForm = true;
  }

  salvar() {

    if (!this.novoAgendamento.animal_id) {
        alert('Selecione um animal.');
        return;
    }

    if (!this.novoAgendamento.servico_id) {
        alert('Selecione um serviço.');
        return;
    }

    if (!this.novoAgendamento.data) {
        alert('Informe a data.');
        return;
    }

    if (!this.novoAgendamento.hora) {
        alert('Informe o horário.');
        return;
    }

    if (!this.horarioSelecionadoValido()) {
        alert('O horário selecionado não está mais disponível.');
        return;
    }

    const requisicaoAgendamento = {
        animal_id: this.novoAgendamento.animal_id,
        servico_id: this.novoAgendamento.servico_id,
        executor_id: this.novoAgendamento.executor_id,
        data: this.novoAgendamento.data,
        hora: this.novoAgendamento.hora,
        observacoes: this.novoAgendamento.observacoes || null
    };

    this.agendamentosService.criarAgendamento(requisicaoAgendamento).subscribe({
            next: () => {
                alert('Agendamento criado com sucesso.');
                this.carregarAgendamentos();
                this.mostrarForm = false;
                this.novoAgendamento = {
                    animal_id: null,
                    servico_id: null,
                    executor_id: null,
                    data: '',
                    hora: '',                    
                    observacoes: ''
                };
                this.horariosDisponiveis = [];
            },

            error: err => {
                console.error(err);
                alert('Erro ao criar agendamento.');
            }
    });

  }

  cancelar() {

    this.mostrarForm = false;
    this.horariosDisponiveis = [];
    this.novoAgendamento = {
        animal_id: null,
        servico_id: null,
        executor_id: null,
        data: '',
        hora: '',
        observacoes: ''
    };
  }

  voltarCliente() {
    this.router.navigate(['/clientes']);
  }

  private carregarHorariosDisponiveis(): void {
    this.agendamentosService.listarHorariosDisponiveis(
            this.novoAgendamento.servico_id!, this.novoAgendamento.executor_id!,this.novoAgendamento.data)
        .subscribe({
            next: (data: any) => {
                this.horariosDisponiveis = data;
            },

            error: err => {
                console.error(err);
                this.horariosDisponiveis = [];
            }
        });
  }
}