import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/auth`;
  private usuario: any = null;
  private token: string | null = null;


  login(login: string, senha: string) {
    return this.http.post<any>( `${this.api}/login`, {login, senha } );
  }

  setSessao(usuario: any, token: string) {
    this.usuario = usuario;
    this.token = token;
    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
     if (this.token) {
      return this.token;
    }
    this.token = localStorage.getItem('token');
    return this.token;
  }

  getUsuarioLogado() {

    if (this.usuario) {
      return this.usuario;
    }

    const usuarioLS = localStorage.getItem('usuario');

    if (!usuarioLS || usuarioLS === 'undefined' || usuarioLS === 'null') {
      return null;
    }

    try {
      this.usuario = JSON.parse(usuarioLS);
      return this.usuario;
    } catch {
      localStorage.removeItem('usuario');
      return null;
    }
  }

  getFuncionario() {
     return this.getUsuarioLogado()?.funcionario ?? null;
  }

  getPerfil() {
     return this.getUsuarioLogado()?.perfil ?? null;
  }

  isAdmin(): boolean {
    const usuario = this.getUsuarioLogado();

    if (!usuario) {
      return false;
    }

    const perfil =
      usuario.perfil ??
      usuario.cargo ??
      usuario.funcionario?.perfil ??
      usuario.funcionario?.cargo;

    if (!perfil) {
      return false;
    }

    return String(perfil).trim().toUpperCase() === 'ADMIN';
  }

  estaLogado() {
      const token = this.getToken();
       return !!token;
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

  }
}