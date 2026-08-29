import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente.model';
import { AuthService } from '../../services/auth.service';
import { LayoutComponent } from '../../layouts/layout.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  novoCliente: Cliente = { nome: '', cpf: '', telefone: '', email: '' };
  clienteSelecionadoId: number | null = null;
  mostrarFormulario = false;
  modoEdicao = false;
  buscaCliente = '';
  mensagem = ''
  isAdmin: boolean = false;

  constructor(
    private api: ApiService, 
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarCliente();
  }

  listarCliente(): void { 
    this.api.listarCliente(this.buscaCliente).subscribe({
      next: (data: any) => {
        this.clientes = data || [];

        if (this.clientes.length === 0) {
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

  criarCliente(): void {
    this.novoCliente = { nome: '', cpf: '', telefone: '', email: '' };
    this.clienteSelecionadoId = null;
    this.modoEdicao = false;
    this.mostrarFormulario = true;
  }

  editarCliente(cliente: Cliente): void {
    this.novoCliente = { ...cliente };
    this.clienteSelecionadoId = cliente.id ?? null;
    this.modoEdicao = true;
    this.mostrarFormulario = true;
  }


  salvarCliente(): void {
    if (this.modoEdicao) {
      if (this.clienteSelecionadoId === null) {
        console.error('Erro: ID do cliente não encontrado.');
        return;
      }
      this.api.atualizarCliente(this.clienteSelecionadoId, this.novoCliente).subscribe({
        next: () => {
          this.listarCliente();
          this.fecharFormulario();
        },
        error: (err) => {
          console.error('Erro ao atualizar cliente.', err);
          alert('Erro ao atualizar cliente.');
        }
      });
    }

    /*this.api.criarCliente(this.novoCliente).subscribe({
      next: () => {
        this.listarCliente();
        this.fecharFormulario();
      },
      error: (err) => {
        console.error('Erro ao criar cliente.', err);
        alert('Erro ao criar cliente.');
      }
    });*/
  }
  
  fecharFormulario(): void {
    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.clienteSelecionadoId = null;
  }

  deletarCliente(cliente: Cliente): void {
    console.log ('entrou em remoção')
    if (cliente.id === undefined) {
      return;
    }

    const confirmacao = confirm(`Tem certeza que deseja deletar o cliente ${cliente.nome}?`);
    if (!confirmacao) {
      return;
    }

    this.api.deletarCliente(cliente.id).subscribe({
      next: () => {
        alert('Cliente removido com sucesso');
        this.listarCliente();
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Erro ao retirar cliente.', err);
      }
    });
  }
}