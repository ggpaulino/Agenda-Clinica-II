import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private authService: AuthService, private router: Router) {}

  @Input()
  funcionario: any;

  @Output()
  sair = new EventEmitter<void>();

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}