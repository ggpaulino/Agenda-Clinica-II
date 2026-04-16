import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // CLIENTES
  getClientes() {
    return this.http.get(`${this.API}/clientes`);
  }

  createCliente(data: any) {
    return this.http.post(`${this.API}/clientes`, data);
  }

  deleteCliente(id: number) {
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

  createAgendamento(data: any) {
    return this.http.post(`${this.API}/agendamentos`, data);
  }
}