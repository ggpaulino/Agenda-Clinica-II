import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private API = 'http://localhost:3001/api/usuarios';

  constructor(private http: HttpClient) {}

  listarUsuarios() {
    return this.http.get(this.API);
  }

  buscarUsuarioPorId(id: number) {
    return this.http.get(`${this.API}/${id}`);
  }

  criarUsuario(data: any) {
    return this.http.post(this.API, data);
  }

  atualizarUsuario(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  removerUsuario(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

}