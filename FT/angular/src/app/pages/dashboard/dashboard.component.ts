import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  clienteEncontrado: any = null;
  mensagem: string = '';

  servicosDisponiveis: any[] = [];
  servicosSelecionados: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.funcionario = this.authService.getFuncionarioLogado();

    if (!this.funcionario) {
      this.router.navigate(['/login']);
      return;
    }

    // Carrega serviços (pode ser mock ou API)
    this.api.getServicos().subscribe((data: any) => {
      this.servicosDisponiveis = data;
    });
  }

  buscarCliente() {
    this.mensagem = '';
    this.clienteEncontrado = null;
    this.servicosSelecionados = [];

    this.api.listarCliente(this.listarCliente).subscribe({
      next: (res: any) => {
        this.clienteEncontrado = res;
      },
      error: () => {
        this.mensagem = 'Cliente não encontrado';
      }
    });
  }

  toggleServico(servico: any) {
    const index = this.servicosSelecionados.findIndex(s => s.id === servico.id);

    if (index >= 0) {
      this.servicosSelecionados.splice(index, 1);
    } else {
      this.servicosSelecionados.push(servico);
    }
  }

  irParaCadastroCliente() {
    this.router.navigate(['/clientes/novo']);
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