import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import id from '@angular/common/locales/extra/id';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private API = 'http://localhost:3001/api/servicos';

  constructor(private http: HttpClient) {}

   listarServicos() {
    return this.http.get(this.API);
  }

  criarServicos(data: any) {
    return this.http.post(this.API, data);
  }

  atualizarServicos(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deletarServicos(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}