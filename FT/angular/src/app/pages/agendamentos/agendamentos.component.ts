import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgendamentosService } from '../../services/agendamentos.service';
import { AnimaisService } from '../../services/animais.service';
import { ApiService } from '../../services/api.service';
import { ServicosService } from '../../services/servicos.service';

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

  mostrarForm = false;

  novoAgendamento = {
  animal_id: null,
  servico_id: null,
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

    const requisicaoAgendamento = {
        animal_id: this.novoAgendamento.animal_id,
        servico_id: this.novoAgendamento.servico_id,
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
                    data: '',
                    hora: '',
                    observacoes: ''
                };
            },

            error: err => {
                console.error(err);
                alert('Erro ao criar agendamento.');
            }
    });

  }

  cancelar() {
    this.mostrarForm = false;
  }

  voltarCliente() {
    this.router.navigate(['/clientes']);
  }
}