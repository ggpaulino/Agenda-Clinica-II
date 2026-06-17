import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicosComponent } from './pages/servicos/servicos.component';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, 
  //{ path: 'admin', component: AdminComponent, canActivate: [authGuard] }, 
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/novo', loadComponent: () => import('./pages/clientes/clientes-form.component').then(m => m.ClientesFormComponent) },
  { path: 'clientes/:id/animais/novo', loadComponent: () => import('./pages/animais/animais.component').then(m => m.AnimaisComponent) },
  { path: 'animais/clientes/:id', loadComponent: () =>  import('./pages/animais/animais.component').then(m => m.AnimaisComponent) },
  { path: 'servicos',  loadComponent: () => import('./pages/servicos/servicos.component').then(m => m.ServicosComponent)},
  { path: 'agendamentos/clientes/:id',  loadComponent: () => import('./pages/agendamentos/agendamentos.component').then(m => m.AgendamentosComponent)},
  { path: 'agendamentos', component: AgendamentosComponent },
  { path: 'servicos', component: ServicosComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {}
