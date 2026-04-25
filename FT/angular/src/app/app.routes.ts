import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, 
  //{ path: 'admin', component: AdminComponent, canActivate: [authGuard] }, 
  { path: 'clientes', component: ClientesComponent },
  { path: 'animais', component: AnimaisComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
