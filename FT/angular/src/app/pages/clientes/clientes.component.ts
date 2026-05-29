import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  novoCliente: Cliente = { nome: '', cpf: '', telefone: '', email: '' };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.listarCliente();
  }

  listarCliente(): void {
    this.api.getClientes().subscribe((res: any) => {
      this.clientes = res as Cliente[];
    });
  }

  salvarCliente(): void {
    this.api.criarCliente(this.novoCliente).subscribe(() => {
      this.listarCliente();
      this.novoCliente = { nome: '', cpf: '', telefone: '', email: '' };
    });
  }

  deletarCliente(id: number): void {
    this.api.deletarCliente(id).subscribe(() => {
      this.listarCliente();
    });
  }
}