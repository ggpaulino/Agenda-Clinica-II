import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  private API = 'http://localhost:3001/api/servico';

  constructor(private http: HttpClient) {}

  listarServicos(): Observable<any> {
    return this.http.get(this.API);
  }
}