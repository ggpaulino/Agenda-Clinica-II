import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from '../../layouts/layout.component';
import { UsuariosService } from '../../services/usuarios.service';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Usuario } from '../../models/usuario.model';


@Component({
  standalone: true,
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  funcionarios: any[] = [];
  mostrarFormulario = false;
  modoEdicao = false;
  usuarioSelecionado: number | null = null;
  confirmarSenha = '';

  novoUsuario = {
    funcionario_id: null,
    login: '',
    senha: '',
    perfil: 'COMUM',
    ativo: true
  };

  constructor(
    private usuariosService: UsuariosService,
    private funcionariosService: FuncionariosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
    this.carregarFuncionarios();
  }

  carregarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe({
        next: (data: any) => {
          this.usuarios = [...(data || [])];
          this.cdr.detectChanges();
        },

        error: () => {
          this.usuarios = [];
        }
      });
  }

  carregarFuncionarios() {
    this.funcionariosService.listarFuncionarios().subscribe({
        next: (data: any) => {
          this.funcionarios = [...(data || [])];
        }
      });
  }

  novoCadastro() {
    this.mostrarFormulario = true;
    this.modoEdicao = false;
    this.usuarioSelecionado = null;
    this.novoUsuario = {
      funcionario_id: null,
      login: '',
      senha: '',
      perfil: 'COMUM',
      ativo: true
    };
  }

  editar(usuario: any) {
    this.mostrarFormulario = true;
    this.modoEdicao = true;
    this.usuarioSelecionado = usuario.id;
    this.confirmarSenha = '';
    this.novoUsuario = {
      funcionario_id: usuario.funcionario_id,
      login: usuario.login,
      senha: '',
      perfil: usuario.perfil,
      ativo: usuario.ativo
    };
  }

  salvar() {
    if (!this.novoUsuario.funcionario_id) {
      alert('Selecione um funcionário.');
      return;
    }
    
    if (!this.novoUsuario.login.trim()) {
      alert('Informe o login.');
      return;
    }

    if (!this.modoEdicao) {
      if (!this.novoUsuario.senha.trim()) {
        alert('Informe a senha.');
        return;
      }
      if (this.novoUsuario.senha !== this.confirmarSenha) {
         alert('As senhas não conferem.');
         return;
      }
    } else {
      if (this.novoUsuario.senha.trim() !== '' && this.novoUsuario.senha !== this.confirmarSenha) {
        alert('As senhas não conferem.');
        return;
      }
    }

    if (this.modoEdicao && this.usuarioSelecionado) {
      this.usuariosService.atualizarUsuario(this.usuarioSelecionado, this.novoUsuario).subscribe({
        next: () => {
          this.cancelar();
          this.carregarUsuarios();
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.erro ?? 'Erro ao atualizar usuário.');
        }
      });
      return;
    }

    this.usuariosService.criarUsuario(this.novoUsuario).subscribe({
      next: () => {
        this.cancelar();
        this.carregarUsuarios();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.erro ?? 'Erro ao criar usuário.');
      }
    });       
  }

  excluir(id: number) {
    if (!confirm('Excluir usuário?')) {
      return;
    }

    this.usuariosService.removerUsuario(id).subscribe(() => {
        this.carregarUsuarios();
      });
  }

  cancelar() {

    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.usuarioSelecionado = null;
    this.confirmarSenha = '';
    this.novoUsuario = {
      funcionario_id: null,
      login: '',
      senha: '',
      perfil: 'COMUM',
      ativo: true
    };
  }
}