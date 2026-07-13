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

  login(login: string, senha: string) {
    return this.http.post<any>( `${this.api}/login`, {login, senha } );
  }

  setSessao(usuario: any) {
    this.usuario = usuario;
    localStorage.setItem('usuario',JSON.stringify(usuario));
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

    const usuario = this.getUsuarioLogado();
    return usuario?.funcionario ?? null;
  }

  getPerfil() {

    const usuario = this.getUsuarioLogado();
    return usuario?.perfil ?? null;
  }

  estaLogado() {
    return this.getUsuarioLogado() != null;
  }

  logout() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }
}