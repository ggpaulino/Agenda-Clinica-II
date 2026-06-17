import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AnimaisService } from '../../services/animais.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-animais',
  imports: [CommonModule, FormsModule],
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})

export class AnimaisComponent implements OnInit {

  clienteId!: number;
  cliente: any = null;
  animais: any[] = [];
  mostrarFormulario = false;

  novoAnimal = {
    nome: '',
    especie: '',
    raca: '',
    idade: 0,
    cliente_id: 0
  };

  constructor(private router: Router, private route: ActivatedRoute, private animaisService: AnimaisService,private api: ApiService, private cdr: ChangeDetectorRef) {}

ngOnInit(): void {

  const clienteId = Number(this.route.snapshot.paramMap.get('id'));

  if (!clienteId) {
    this.router.navigate(['/dashboard']);
    return;
  }

  this.clienteId = clienteId;

  this.api.listarClientePorId(clienteId.toString()).subscribe({
    next: (cliente: any) => {
      this.cliente = cliente;
      this.carregarAnimais();

      // NOVO
      if (this.router.url.endsWith('/novo')) {
        this.mostrarFormulario = true;
      }
    }
  });
}

  carregarCliente() {
    this.api.listarClientePorId(this.clienteId.toString()).subscribe({
        next: (cliente: any) => {
          this.cliente = cliente;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  carregarAnimais() {
    this.animaisService.listarPorCliente(this.clienteId).subscribe({
        next: (data: any) => {
          this.animais = data;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  abrirFormularioAnimal() {
    this.mostrarFormulario = true;
  }

  salvarAnimal() {
    const body = {
      nome: this.novoAnimal.nome,
      especie: this.novoAnimal.especie,
      raca: this.novoAnimal.raca,
      idade: this.novoAnimal.idade,
      cliente_id: this.clienteId
    };

    this.animaisService.criarAnimais(body).subscribe({
        next: () => {
          this.carregarAnimais();
          this.novoAnimal = {
            nome: '',
            especie: '',
            raca: '',
            idade: 0,
            cliente_id: 0
          };
          this.mostrarFormulario = false;
          alert("Animal cadastrado com sucesso.");
        },

        error: (err) => {
          console.error(err);
        }
      });
  }

  removerAnimal(id: number) {
    if (!confirm('Remover animal?')) return;
    this.animaisService.removerAnimal(id).subscribe({
        next: () => {
          this.carregarAnimais();
        }
      });
  }

  abrirServicos() {
     this.router.navigate(['/clientes', this.clienteId,'agendamento']);
   }
}