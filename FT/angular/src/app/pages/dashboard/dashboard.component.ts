import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  funcionario: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.funcionario = this.authService.getFuncionarioLogado();
    if (!this.funcionario) {
      this.router.navigate(['/login']);
      return
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}