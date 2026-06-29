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
    servico: '',
    data: '',
    hora: ''
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

    const payload = {
      cliente_id: this.clienteId,
      ...this.novoAgendamento
    };

        this.agendamentosService.criarAgendamento(payload).subscribe({
        next: () => {
        alert('Agendamento criado com sucesso');
        this.router.navigate(['/dashboard']);
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