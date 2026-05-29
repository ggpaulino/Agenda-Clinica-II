import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicosService } from '../../services/servicos.service';

@Component({
  standalone: true,
  selector: 'app-servicos',
  imports: [CommonModule, FormsModule],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})

export class ServicosComponent implements OnInit {

  servicos: any[] = [];

  mostrarFormulario = false;

  novoServico = {
    nome: '',
    preco: 0
  };

  constructor(
    private servicosService: ServicosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicosService.listarServicos().subscribe({
      next: (data: any) => {
        this.servicos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  salvarServico() {
    this.servicosService.criarServicos(this.novoServico).subscribe({
      next: () => {
        this.mostrarFormulario = false;

        this.novoServico = {
          nome: '',
          preco: 0
        };

        this.carregarServicos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  removerServicos(id: number) {

    if (!confirm('Remover serviço?')) return;

    this.servicosService.removerServicos(id).subscribe({
      next: () => {
        this.carregarServicos();
      }
    });
  }
}
