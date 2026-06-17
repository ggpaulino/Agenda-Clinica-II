import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimaisService } from '../../services/animais.service';

@Component({
  standalone: true,
  selector: 'app-animais-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './animais-form.component.html',
  styleUrls: ['./animais-form.component.css']
})
export class AnimaisFormComponent implements OnInit {

  clienteId!: number;
  animal = {nome: '', especie: '', raca: '', idade: 0 };

  constructor(private route: ActivatedRoute,private router: Router,private animaisService: AnimaisService) {}

  ngOnInit(): void {

    this.clienteId = Number(
      this.route.snapshot.paramMap.get('id')
    );
  }

  salvar() {
    const body = {
      ...this.animal,
      cliente_id: this.clienteId
    };

    this.animaisService.criarAnimais(body).subscribe({
      next: () => {
        this.router.navigate(['/animais', 'clientes', this.clienteId]);
      },

      error: err => {
        console.error(err);
      }
    });
  }

  finalizar() {
    this.router.navigate(['/animais', 'clientes', this.clienteId]);
  }
}