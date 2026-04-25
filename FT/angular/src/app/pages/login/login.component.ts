import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Funcionario } from '../../models/funcionario.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  login: string = '';
  senha: string = '';
  erro: string = '';

  entrar() {
    this.erro = '';
    this.authService.login(this.login, this.senha).subscribe({
      next: (res: any) => {
        this.authService.setSessao(res.funcionario);
        this.router.navigate(['/dashboard']);
      },    
      error: () => {
        this.erro = 'Login inválido';
      }
    });
  }
}