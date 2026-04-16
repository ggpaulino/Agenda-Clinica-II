import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];
  novoCliente = { nome: '', cpf: '', telefone: '', email: '' };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.api.getClientes().subscribe((res: any) => {
      this.clientes = res;
    });
  }

  salvar() {
    this.api.createCliente(this.novoCliente).subscribe(() => {
      this.carregar();
      this.novoCliente = { nome: '', cpf: '', telefone: '', email: '' };
    });
  }

  deletar(id: number) {
    this.api.deleteCliente(id).subscribe(() => {
      this.carregar();
    });
  }
}