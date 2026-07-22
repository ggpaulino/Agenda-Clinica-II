import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  senha = '';
  erro = '';

  entrar() {
    this.erro = '';
    if (!this.login.trim() || !this.senha.trim()) {
      this.erro = 'Informe login e senha.';
      return;
    }

    this.authService.login(this.login, this.senha).subscribe({
        next: (res: any) => { console.log(res);
<<<<<<< HEAD
          this.authService.setSessao(res.usuario, res.token); 
=======
          this.authService.setSessao(res.usuario); 
>>>>>>> c6d1fcf833351e19f25ae43a45fd967286d0f9c9
          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          console.error(err);
          this.erro =
            err?.error?.error ||
            'Login ou senha inválidos';
        }
      });
  }
}