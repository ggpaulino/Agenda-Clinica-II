import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../layouts/layout.component';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-funcionarios',
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  funcionarios: any[] = [];

  mostrarFormulario = false;
  modoEdicao = false;

  funcionarioSelecionado: number | null = null;

  novoFuncionario = {

    nome: '',
    email: '',
    cpf: '',
    cargo: '',
    salario: 0,
    telefone: '',
    ativo: true

  };

  constructor(
    private funcionariosService: FuncionariosService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {

    this.funcionariosService.listarFuncionarios()
      .subscribe({

        next: (data: any) => {

          this.funcionarios = [...(data || [])];

          this.cdr.detectChanges();

        },

        error: () => {

          this.funcionarios = [];

        }

      });

  }

  novoCadastro() {

    this.modoEdicao = false;

    this.mostrarFormulario = true;

    this.funcionarioSelecionado = null;

    this.novoFuncionario = {

      nome: '',
      email: '',
      cpf: '',
      cargo: '',
      salario: 0,
      telefone: '',      
      ativo: true

    };

  }

  editar(funcionario: any) {

    this.modoEdicao = true;

    this.mostrarFormulario = true;

    this.funcionarioSelecionado = funcionario.id;

    this.novoFuncionario = {

      nome: funcionario.nome,
      email: funcionario.email,
      cpf: funcionario.cpf,      
      cargo: funcionario.cargo,
      salario: funcionario.salario,
      telefone: funcionario.telefone,
      ativo: funcionario.ativo
    };

  }

  salvar() {

    if (this.modoEdicao && this.funcionarioSelecionado) {

      this.funcionariosService
      .atualizarFuncionario(
        this.funcionarioSelecionado,
        this.novoFuncionario
      )
      .subscribe(() => {

        this.cancelar();

        this.carregarFuncionarios();

      });

      return;

    }

    this.funcionariosService
      .criarFuncionario(this.novoFuncionario)
      .subscribe(() => {

        this.cancelar();

        this.carregarFuncionarios();

      });

  }

  excluir(id: number) {

    if (!confirm('Excluir funcionário?')) return;

    this.funcionariosService
      .removerFuncionario(id)
      .subscribe(() => {

        this.carregarFuncionarios();

      });

  }

  cancelar() {

    this.mostrarFormulario = false;

    this.modoEdicao = false;

    this.funcionarioSelecionado = null;

  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}