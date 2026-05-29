import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicosService } from '../../services/servicos.service';
import { AnimaisService } from '../../services/animais.service';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-agendamento',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})

export class AgendamentosComponent implements OnInit {

  cliente: any = {};
  //cliente: any = null;
  animais: any[] = [];
  servicos: any[] = [];
  servicosSelecionados: any[] = [];
  data = '';
  horario = '';

  constructor(
    private route: ActivatedRoute,
    private servicosService: ServicosService,
    private animaisService: AnimaisService,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) return;
      this.cliente.id = Number(id);
      this.carregarCliente();
      this.carregarAnimais();
      this.carregarServicos();
    });
  }

  carregarCliente() {

    this.api.listarClientePorId(this.cliente.id).subscribe({
      next: (cliente: any) => {
        this.cliente = cliente;
        this.cdr.detectChanges();
      }
    });
  }

  carregarAnimais() {
    this.animaisService.listarPorCliente(this.cliente.id).subscribe({
      next: (animais: any) => {
        this.animais = animais;
        this.cdr.detectChanges();
      }
    });
  }

  carregarServicos() {

    this.servicosService.listarServicos().subscribe({
      next: (servicos: any) => {
        this.servicos = servicos;
        this.cdr.detectChanges();
      }
    });
  }

  toggleServico(servico: any) {

    const index = this.servicosSelecionados.findIndex(
      s => s.id === servico.id
    );

    if (index >= 0) {
      this.servicosSelecionados.splice(index, 1);
    } else {
      this.servicosSelecionados.push(servico);
    }
  }

  confirmarAgendamento() {

    console.log({
      cliente: this.cliente,
      animais: this.animais,
      servicos: this.servicosSelecionados,
      data: this.data,
      horario: this.horario
    });

    alert('Agendamento preparado para integração.');

  }

}
