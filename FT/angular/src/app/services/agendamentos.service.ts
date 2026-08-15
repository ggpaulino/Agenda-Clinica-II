import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  private API = 'http://localhost:3001/api/agendamentos';

  constructor(private http: HttpClient) {}

  listarPorCliente(id: number) {
    return this.http.get(`${this.API}/clientes/${id}`);
  }

 listarDisponibilidade(servicoId: number, data: string) {
    return this.http.get(`${this.API}/disponibilidade`, { params: {servico_id: servicoId, data}});
  }

  listarHorariosDisponiveis(servicoId:number, executorId:number, data:string) {
    return this.http.get(`${this.API}/disponibilidade`, { params: {servico_id: servicoId, executor_id: executorId, data}});
  }

  listarDisponibilidadeExecutor(executorId: number, data: string) {
    return this.http.get(`${this.API}/disponibilidade`, { params: { executor_id: executorId, data: data}});
  }

    listarTodos() {
    return this.http.get<any[]>(`${this.API}`);
  }

  listarFuncionarios(servicoId: number) {
    return this.http.get(`${this.API}/executores/${servicoId}`);
  }

  criarAgendamento(data: any) {
    return this.http.post(`${this.API}`, data);
  }

  atualizar(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deletar(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}