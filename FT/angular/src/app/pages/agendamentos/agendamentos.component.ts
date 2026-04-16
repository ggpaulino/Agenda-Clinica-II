import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-agendamentos',
  imports: [],
  templateUrl: './agendamentos.component.html',
  styleUrl: './agendamentos.css',
})
export class AgendamentosComponent implements OnInit {

  agendamentos: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAgendamentos().subscribe((res: any) => {
      this.agendamentos = res;
    });
  }
}