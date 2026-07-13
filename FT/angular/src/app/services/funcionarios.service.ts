import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private API = 'http://localhost:3001/api/funcionarios';

  constructor(private http: HttpClient) {}

  listarFuncionarios() {
    return this.http.get(this.API);
  }

  listarFuncionarioPorId(id: number) {
    return this.http.get(`${this.API}/${id}`);
  }

  criarFuncionario(data: any) {
    return this.http.post(this.API, data);
  }

  atualizarFuncionario(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  removerFuncionario(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

}