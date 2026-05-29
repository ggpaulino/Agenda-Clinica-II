import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import id from '@angular/common/locales/extra/id';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private API = 'http://localhost:3001/api/servico';

  constructor(private http: HttpClient) {}

  listarServicos(): Observable<any> {
    return this.http.get(this.API);
  }

  criarServicos(body: any) {
    return this.http.post(this.API, body);
  }

  removerServicos(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}