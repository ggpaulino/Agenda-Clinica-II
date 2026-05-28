import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  funcionario: any;

  buscaCliente = '';

  clientesEncontrados: any[] = [];

  clienteSelecionado: any = null;

  mensagem = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService
  ) {
    this.funcionario = this.authService.getFuncionarioLogado();

    if (!this.funcionario) {
      this.router.navigate(['/login']);
    }
  }

  buscarCliente() {

    this.mensagem = '';

    this.api.listarCliente(this.buscaCliente).subscribe(
      (res: any) => {
        this.clientesEncontrados = res;
        if (res.length === 0) {
          this.mensagem = 'Nenhum cliente encontrado';
        }
      },
      () => {
        this.mensagem = 'Erro ao buscar cliente';
      }
    );
  }

  selecionarCliente(cliente: any) {

    this.clienteSelecionado = cliente;
    this.clientesEncontrados = [];
    this.buscaCliente = '';
  }

  criarCliente() {
    this.router.navigate(['/clientes/novo']);
  }

  abrirServicos() {
    this.router.navigate(['/servicos']);
  }

  abrirAnimais(cliente: any) {
    this.router.navigate(['/animais/clientes', cliente.id]);
  }

  abrirPagamentos() {

    if (!this.clienteSelecionado) return;

    this.router.navigate(['/pagamentos'], {
      state: {
        cliente: this.clienteSelecionado
      }
    });
  }

  abrirAgendamento() {

    if (!this.clienteSelecionado) return;

    this.router.navigate(['/agendamento'], {
      state: {
        cliente: this.clienteSelecionado
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}