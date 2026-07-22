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
<<<<<<< HEAD
  private token: string | null = null;
=======
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9

  login(login: string, senha: string) {
    return this.http.post<any>( `${this.api}/login`, {login, senha } );
  }

<<<<<<< HEAD
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

=======
  setSessao(usuario: any) {
    this.usuario = usuario;
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }

>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
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
<<<<<<< HEAD
     return this.getUsuarioLogado()?.funcionario ?? null;
  }

  getPerfil() {
     return this.getUsuarioLogado()?.perfil ?? null;
  }

  estaLogado() {
    return this.getToken() !== null;
=======

    const usuario = this.getUsuarioLogado();
    return usuario?.funcionario ?? null;
  }

  getPerfil() {

    const usuario = this.getUsuarioLogado();
    return usuario?.perfil ?? null;
  }

  estaLogado() {
    return this.getUsuarioLogado() != null;
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
  }

  logout() {
    this.usuario = null;
<<<<<<< HEAD
    this.token = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
=======
    localStorage.removeItem('usuario');
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
  }
}