import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

private http = inject(HttpClient);
private api = `${environment.apiUrl}/auth`;
private funcionario: any = null;

  login(login: string, senha: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { login, senha });
  }
    setSessao(funcionario: any) {
    this.funcionario = funcionario;
    localStorage.setItem('funcionario', JSON.stringify(funcionario));
  }

    getFuncionarioLogado() {
    if (this.funcionario) return this.funcionario;

    const funcionarioLS = localStorage.getItem('funcionario');
    this.funcionario = funcionarioLS ? JSON.parse(funcionarioLS) : null;

    return this.funcionario;
  }
    logout() {
    this.funcionario = null;
    localStorage.removeItem('funcionario');
  }

}
