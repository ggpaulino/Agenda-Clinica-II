import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API = 'http://localhost:3001/api/clientes';

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<any> {
    return this.http.get(this.API);
  }
  criarCliente(data: any) {
    return this.http.post(`${this.API}`, data);
  }
 
  atualizarCliente(id: number, data: any) {
    return this.http.post(`${this.API}/atualizar/${id}`, data);
  }

  deletarCliente(id: number) {
    return this.http.post(`${this.API}/deletar/${id}`, {});
  }
}