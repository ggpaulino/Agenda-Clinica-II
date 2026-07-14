import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuariosService } from '../../services/usuarios.service';
import { FuncionariosService } from '../../services/funcionarios.service';

@Component({
  standalone: true,
  selector: 'app-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  funcionarios: any[] = [];
  mostrarFormulario = false;
  modoEdicao = false;
  usuarioSelecionado: number | null = null;

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
    this.novoUsuario = {
      funcionario_id: usuario.funcionario_id,
      login: usuario.login,
      senha: '',
      perfil: usuario.perfil,
      ativo: usuario.ativo
    };
  }

  salvar() {
    if (this.modoEdicao && this.usuarioSelecionado) {
      this.usuariosService.atualizarUsuario(this.usuarioSelecionado, this.novoUsuario).subscribe(() => {
          this.cancelar();
          this.carregarUsuarios();
        });
      return;
    }

    this.usuariosService.criarUsuario(this.novoUsuario).subscribe(() => {
        this.cancelar();
        this.carregarUsuarios();
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
  }
}