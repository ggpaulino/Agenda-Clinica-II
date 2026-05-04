import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-agendamentos',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {

  cliente: any;
  servicos: any[] = [];

  data: string = '';
  hora: string = '';

  mensagem: string = '';

  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const state = history.state;

    if (!state.cliente || !state.servicos) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.cliente = state.cliente;
    this.servicos = state.servicos;
  }

  confirmarAgendamento() {
    this.mensagem = '';

    if (!this.data || !this.hora) {
      this.mensagem = 'Preencha data e hora';
      return;
    }

    const payload = {
      cliente_id: this.cliente.id,
      servicos: this.servicos.map(s => s.id),
      data: this.data,
      hora: this.hora
    };

    this.api.criarAgendamento(payload).subscribe({
      next: () => {
        alert('Agendamento realizado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.mensagem = 'Erro ao agendar';
      }
    });
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}