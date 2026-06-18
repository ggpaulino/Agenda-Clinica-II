import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private API = 'http://localhost:3001/api/animais';

  constructor(private http: HttpClient) {}

  listarPorCliente(clienteId: number) {
    return this.http.get(
      `${this.API}/clientes/${clienteId}`
    );
  }

  removerAnimal(id: number) {
    return this.http.delete(
      `${this.API}/${id}`
    );
  }

  criarAnimais(animal: any) {
    return this.http.post(
      `${this.API}/clientes/${animal.cliente_id}`,
      animal
    );
  }
}