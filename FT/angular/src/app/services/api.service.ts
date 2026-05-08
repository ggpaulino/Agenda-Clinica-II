import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // CLIENTES
  getClientes() {
    return this.http.get(`${this.API}/clientes`);
  }

  listarCliente(nome: string) {
      return this.http.get(`http://localhost:3001/api/clientes`,{ params: { nome } });
  }

  criarCliente(data: any) {
    return this.http.post(`${this.API}/clientes`, data);
  }

  deletarCliente(id: number) {
    return this.http.delete(`${this.API}/clientes/${id}`);
  }

  // ANIMAIS
  getAnimais() {
    return this.http.get(`${this.API}/animais`);
  }

  createAnimal(data: any) {
    return this.http.post(`${this.API}/animais`, data);
  }

  // AGENDAMENTOS
  getAgendamentos() {
    return this.http.get(`${this.API}/agendamentos`);
  }

  criarAgendamento(data: any) {
    return this.http.post(`${this.API}/agendamentos`, data);
  }

  getServicos() {
    return this.http.get(`${this.API}/servicos`);
  }
}