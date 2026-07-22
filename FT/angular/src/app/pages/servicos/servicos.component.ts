import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicosService } from '../../services/servicos.service';
import { FuncionariosService } from '../../services/funcionarios.service';

interface ServicoForm {
  nome: string;
  preco: number;
  cargo_executor: string;
  duracao_minutos: number;
}

@Component({
  standalone: true,
  selector: 'app-servicos',
  imports: [CommonModule, FormsModule],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})

export class ServicosComponent implements OnInit {

  servicos: any[] = [];
  cargos: string[] = [];
  mostrarFormulario = false;

  novoServico: ServicoForm = {
    nome: '',
    preco: 0,
    cargo_executor: '',
    duracao_minutos: 30
  };

  constructor(
    private servicosService: ServicosService,
    private funcionariosService: FuncionariosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.carregarServicos();
      this.carregarCargos();
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

  carregarCargos() {
  this.funcionariosService.listarCargos().subscribe({
      next: (data: any) => {
        this.cargos = data;
        this.cdr.detectChanges();
      },
    error: err => console.error(err)
   });
 }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  atualizarServicos() {
    this.servicosService.criarServicos(this.novoServico).subscribe({
      next: () => {
        this.mostrarFormulario = false;

        this.novoServico = {
          nome: '',
          preco: 0,
          cargo_executor: '',
          duracao_minutos: 30
        };

        this.carregarServicos();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deletarServicos(id: number) {

    if (!confirm('Remover serviço?')) return;

    this.servicosService.deletarServicos(id).subscribe({
      next: () => {
        this.carregarServicos();
      }
    });
  }
}
