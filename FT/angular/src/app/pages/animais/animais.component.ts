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
  modoEdicao = false;
  animalSelecionadoId: number | null = null;

  novoAnimal = {
    nome: '',
    especie: '',
    raca: '',
    idade: 0    
  };

  constructor(private router: Router, private route: ActivatedRoute, private animaisService: AnimaisService,private api: ApiService, private cdr: ChangeDetectorRef) {}

ngOnInit(): void {

  const id = Number(this.route.snapshot.paramMap.get('id'));

  if (!id) {
    this.router.navigate(['/dashboard']);
    return;
  }

  this.clienteId = id;

  this.api.listarClientePorId(id.toString()).subscribe({
    next: (cliente: any) => {
      this.cliente = cliente;
      this.carregarAnimais();
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
      this.animais = data || [];
      this.cdr.detectChanges();
    },

    error: (err) => {

      // Se não houver animais, apenas exibe lista vazia
      if (err.status === 404) {
        this.animais = [];
        this.cdr.detectChanges();
        return;
      }
      console.error(err);
    }
  });
}

  abrirFormularioAnimal() {
     this.modoEdicao = false;
     this.mostrarFormulario = true;
     this.novoAnimal = {
      nome: '',
      especie: '',
      raca: '',
      idade: 0
    };
  }

  editarAnimal(animal: any) {
    this.modoEdicao = true;
    this.mostrarFormulario = true;
    this.animalSelecionadoId = animal.id;

    this.novoAnimal = {
      nome: animal.nome,
      especie: animal.especie,
      raca: animal.raca,
      idade: animal.idade
    };
  }

  salvarAnimal() {

    const payload = {
      ...this.novoAnimal,
      cliente_id: this.clienteId
    };

    if (this.modoEdicao && this.animalSelecionadoId) {

      this.animaisService.atualizarAnimal(this.animalSelecionadoId, payload)
        .subscribe({
          next: () => {
            this.carregarAnimais();
            this.cancelarFormulario();
          }
        });

    } else {

      this.animaisService.criarAnimal(payload)
        .subscribe({
          next: () => {
            this.carregarAnimais();
            this.cancelarFormulario();
          }
        });

    }
  }

  removerAnimal(id: number) {
    if (!confirm('Deseja remover este animal?')) return;
      this.animaisService.removerAnimal(id).subscribe({next: () => this.carregarAnimais() });
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.animalSelecionadoId = null;
  }

  abrirAgendamento() {
    this.router.navigate(['/agendamentos/clientes', this.clienteId]);
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AnimaisService } from '../../services/animais.service';

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
  modoEdicao = false;

  animalSelecionadoId: number | null = null;

  novoAnimal = {
    nome: '',
    especie: '',
    raca: '',
    idade: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private animaisService: AnimaisService,
    private api: ApiService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.clienteId = id;

    this.api.listarClientePorId(id.toString()).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.carregarAnimais();
      }
    });
  }

  carregarAnimais() {
    this.animaisService.listarPorCliente(this.clienteId).subscribe({
      next: (data: any) => {
        this.animais = data || [];
      },
      error: () => {
        this.animais = [];
      }
    });
  }

  abrirFormularioNovo() {
    this.modoEdicao = false;
    this.mostrarFormulario = true;

    this.novoAnimal = {
      nome: '',
      especie: '',
      raca: '',
      idade: 0
    };
  }

  editarAnimal(animal: any) {
    this.modoEdicao = true;
    this.mostrarFormulario = true;
    this.animalSelecionadoId = animal.id;

    this.novoAnimal = {
      nome: animal.nome,
      especie: animal.especie,
      raca: animal.raca,
      idade: animal.idade
    };
  }

  salvarAnimal() {

    const payload = {
      ...this.novoAnimal,
      cliente_id: this.clienteId
    };

    if (this.modoEdicao && this.animalSelecionadoId) {

      this.animaisService.atualizarAnimal(this.animalSelecionadoId, payload)
        .subscribe({
          next: () => {
            this.carregarAnimais();
            this.cancelarFormulario();
          }
        });

    } else {

      this.animaisService.criarAnimal(payload)
        .subscribe({
          next: () => {
            this.carregarAnimais();
            this.cancelarFormulario();
          }
        });

    }
  }

  removerAnimal(id: number) {

    if (!confirm('Deseja remover este animal?')) return;

    this.animaisService.removerAnimal(id)
      .subscribe({
        next: () => this.carregarAnimais()
      });

  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.animalSelecionadoId = null;
  }

  abrirAgendamento() {
    this.router.navigate(['/agendamentos/clientes', this.clienteId]);
  }
}

*/