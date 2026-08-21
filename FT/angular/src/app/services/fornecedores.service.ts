import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {

  private API = 'http://localhost:3001/api/fornecedores';

  constructor(private http: HttpClient) {}

  listarFornecedores() {
    return this.http.get(this.API);
  }

  criarFornecedor(data: any) {
    return this.http.post(this.API, data);
  }

  atualizarFornecedor(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deletarFornecedor(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

}