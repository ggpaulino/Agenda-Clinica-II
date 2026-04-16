import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ClientesComponent } from './pages/clientes/clientes.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { AgendamentosComponent } from './pages/agendamentos/agendamentos.component';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'animais', component: AnimaisComponent },
  { path: 'agendamentos', component: AgendamentosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}