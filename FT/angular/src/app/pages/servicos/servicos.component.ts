import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ServicosService } from '../../services/servicos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {

  servicos: any[] = [];

  constructor(private servicosService: ServicosService, private router: Router) {}

  ngOnInit(): void {
    this.carregarServicos();
  }

  carregarServicos() {
    this.servicosService.listarServicos().subscribe({
      next: (data: any) => {
        this.servicos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar serviços', err);
      }
    });
  }
}