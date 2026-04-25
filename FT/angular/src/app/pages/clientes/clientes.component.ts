import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule} from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];
  novoCliente = { nome: '', cpf: '', telefone: '', email: '' };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.api.getClientes().subscribe((res: any) => {
      this.clientes = res;
    });
  }

  salvar(): void {
    this.api.createCliente(this.novoCliente).subscribe(() => {
      this.carregar();
      this.novoCliente = { nome: '', cpf: '', telefone: '', email: '' };
    });
  }

  deletar(id: number): void {
    this.api.deleteCliente(id).subscribe(() => {
      this.carregar();
    });
  }
}