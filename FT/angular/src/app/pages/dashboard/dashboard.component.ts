import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { LayoutComponent } from '../../layouts/layout.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  usuario: any = null;
  funcionario: any = null;
  isAdmin: boolean = false;
  buscaCliente = '';
  clientesEncontrados: any[] = [];
  clienteSelecionado: any = null;
  mensagem = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) 

  {
    this.usuario = this.authService.getUsuarioLogado();
    this.funcionario = this.authService.getFuncionario();
    this.isAdmin = this.authService.isAdmin();
    
    if (!this.usuario) {
      this.router.navigate(['/login']);
    }
  }

    buscarCliente() {
    this.api.listarCliente(this.buscaCliente).subscribe({
      next: (data: any) => {
        this.clientesEncontrados = data || [];

        if (this.clientesEncontrados.length === 0) {
          this.mensagem = 'Nenhum cliente encontrado.';
        } else {
          this.mensagem = '';
        }
        this.cdr.detectChanges();
      },

      error: () => {
        this.mensagem = 'Erro ao buscar cliente.';
        this.cdr.detectChanges();
      }
        
    });
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
    this.router.navigate(['/agenda']);
  }

  abrirFuncionarios() {
    this.router.navigate(['/funcionarios']);
  }

  abrirUsuarios() {
    this.router.navigate(['/usuarios']);
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}