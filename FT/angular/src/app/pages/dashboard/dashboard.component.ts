import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicosService } from '../../services/servicos.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  funcionario: any;
  listarCliente: string = '';
  clienteEncontrado: any = [] = [];
  clienteSelecionado: any = null;
  mensagem: string = '';

  servicosDisponiveis: any[] = [];
  servicosSelecionados: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    private servicosService: ServicosService
  ) {}

  ngOnInit(): void {
    this.funcionario = this.authService.getFuncionarioLogado();

    if (!this.funcionario) {
      this.router.navigate(['/login']);
      return;
    }
  }

buscarCliente() {
  this.mensagem = '';
  this.clienteSelecionado = null;
  this.servicosSelecionados = [];

  this.api.listarCliente(this.listarCliente).subscribe({
    next: (res: any) => {
      if (res.length > 0) {
        this.clienteEncontrado = res;
      } else {
        this.clienteEncontrado = [];
        this.mensagem = 'Nenhum cliente encontrado';
      }
    },
    error: () => {
      this.mensagem = 'Erro ao buscar cliente';
    }
  });
}

selecionarCliente(cliente: any) {

  this.clienteSelecionado = cliente;
  this.clienteEncontrado = [];
  this.servicosService.listarServicos().subscribe({
    next: (data: any) => {
      this.servicosDisponiveis = data;
      console.log('Serviços carregados:', data);
    },

    error: (err) => {
      console.error('Erro ao carregar serviços', err);
    }
  });
}

irParaCadastroCliente() {
    this.router.navigate(['/clientes/novo']);
  }

toggleServico(servico: any) {
  const index = this.servicosSelecionados.findIndex(s => s.id === servico.id);
  if (index >= 0) {
    this.servicosSelecionados.splice(index, 1);
  } else {
    this.servicosSelecionados.push(servico);
  }
}

  agendar() {
    if (!this.clienteEncontrado || this.servicosSelecionados.length === 0) return;

    this.router.navigate(['/agendamento'], {
      state: {
        cliente: this.clienteEncontrado,
        servicos: this.servicosSelecionados
      }
    });
  }

  pagamentos() {
    this.router.navigate(['/pagamentos']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

/*toggleServico(servico: any) {
    const index = this.servicosSelecionados.findIndex(s => s.id === servico.id);

    if (index >= 0) {
      this.servicosSelecionados.splice(index, 1);
    } else {
      this.servicosSelecionados.push(servico);
    }
  }
*/