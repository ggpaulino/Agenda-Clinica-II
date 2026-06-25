import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private API = 'http://localhost:3001/api/animais';

  constructor(private http: HttpClient) {}

  listarPorCliente(clienteId: number) {
    return this.http.get(`${this.API}/clientes/${clienteId}`);
  }

  removerAnimal(id: number) {
    return this.http.post(`${this.API}/deletar/${id}`, {});
  }

  criarAnimal(data: any) {
    return this.http.post(`${this.API}`, data);
  }

  atualizarAnimal(id: number, data: any) {
    return this.http.post(`${this.API}/atualizar/${id}`, data);
  }
}

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private API = 'http://localhost:3001/api/animais';

  constructor(private http: HttpClient) {}

  listarPorCliente(clienteId: number) {
    return this.http.get(`${this.API}/clientes/${clienteId}`);
  }

  criarAnimal(data: any) {
    return this.http.post(`${this.API}`, data);
  }

  atualizarAnimal(id: number, data: any) {
    return this.http.post(`${this.API}/atualizar/${id}`, data);
  }

  removerAnimal(id: number) {
    return this.http.post(`${this.API}/deletar/${id}`, {});
  }
}

*/