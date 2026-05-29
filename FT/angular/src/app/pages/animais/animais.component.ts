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

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.router.navigate(['/dashboard']);
        return;
      }
      this.clienteId = Number(id);
      this.carregarCliente();
      this.carregarAnimais();
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
          this.mostrarFormulario = false;
          this.novoAnimal = {
            nome: '',
            especie: '',
            raca: '',
            idade: 0,
            cliente_id: 0
          };

          this.carregarAnimais();
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

  abrirServicos(animal: any) {
    this.router.navigate(['/clientes', this.clienteId, 'animais', animal.id,'servicos']);
  }
}