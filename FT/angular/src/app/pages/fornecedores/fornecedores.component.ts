import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FornecedoresService } from '../../services/fornecedores.service';
import { LayoutComponent } from '../../layouts/layout.component';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  fornecedores: any[] = [];

  fornecedorSelecionado: any = null;

  novoFornecedor = {
    nome: '',
    cnpj: '',
    telefone: '',
    email: ''
  };

  carregando = false;
  mensagem = '';
  erro = '';

    constructor(
    private router: Router,
    private authService: AuthService,
    private fornecedoresService: FornecedoresService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.listarFornecedores();
  }

  listarFornecedores() {
    this.carregando = true;
    this.erro = '';

    this.fornecedoresService.listarFornecedores().subscribe({
      next: (data: any) => {
        this.fornecedores = data;
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar fornecedores:', err);
        this.erro = 'Não foi possível carregar os fornecedores.';
        this.carregando = false;
      }
    });
  }

  criarFornecedor(): void {
    this.mensagem = '';
    this.erro = '';

    this.fornecedoresService.criarFornecedor(this.novoFornecedor).subscribe({
      next: (fornecedor) => {
        this.mensagem = 'Fornecedor cadastrado com sucesso.';

        this.fornecedores.push(fornecedor);

        this.novoFornecedor = {
          nome: '',
          cnpj: '',
          telefone: '',
          email: ''
        };
      },
      error: (err) => {
        console.error('Erro ao cadastrar fornecedor:', err);
        this.erro = 'Não foi possível cadastrar o fornecedor.';
      }
    });
  }

  atualizarFornecedor(fornecedor: any): void {
    this.fornecedorSelecionado = {...fornecedor};
    this.mensagem = '';
    this.erro = '';  
  }

  salvarEdicao(): void {
     if (!this.fornecedorSelecionado) {
      return;
    }

     this.mensagem = '';
     this.erro = '';

     const id = this.fornecedorSelecionado.id;

     this.fornecedoresService.atualizarFornecedor(id,this.fornecedorSelecionado).subscribe({
        next: (fornecedorAtualizado: any) => {
          const indice = this.fornecedores.findIndex((f: any) => f.id === fornecedorAtualizado.id);
          
          if (indice !== -1) {
            this.fornecedores[indice] = fornecedorAtualizado;
            }

          this.fornecedorSelecionado = null;
          this.mensagem = 'Fornecedor atualizado com sucesso.';
       },

     error: (err) => {
       console.error('Erro ao atualizar fornecedor:', err);
       this.erro = 'Não foi possível atualizar o fornecedor.';
    }
  });
 } 

  cancelarEdicao(): void {
    this.fornecedorSelecionado = null;
    this.mensagem = '';
    this.erro = '';
  }

  excluirFornecedor(fornecedor: any): void {
    const confirmar = confirm(
      `Deseja realmente excluir o fornecedor "${fornecedor.nome}"?`
    );

    if (!confirmar) {
      return;
    }

    this.mensagem = '';
    this.erro = '';

    this.fornecedoresService.deletarFornecedor(fornecedor.id).subscribe({
      next: () => {
        this.fornecedores = this.fornecedores.filter(
          f => f.id !== fornecedor.id
        );

        this.mensagem = 'Fornecedor removido com sucesso.';
      },
      error: (err) => {
        console.error('Erro ao excluir fornecedor:', err);
        this.erro = 'Não foi possível excluir o fornecedor.';
      }
    });
  }
}