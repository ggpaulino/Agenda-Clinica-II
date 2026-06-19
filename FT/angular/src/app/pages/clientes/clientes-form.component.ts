import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-clientes-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})

export class ClientesFormComponent {
  cliente = { id: '', nome: '', cpf: '', telefone: '',  email: '' };

  constructor( private api: ApiService, private router: Router) {}

  salvar() {
    this.api.criarCliente(this.cliente).subscribe({
      next: (clienteCriado: any) => {
        alert('Cliente cadastrado com sucesso');
        this.router.navigate(['/clientes', clienteCriado.id, 'animais', 'novo']);
      },

      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar cliente');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard']);
  }
}