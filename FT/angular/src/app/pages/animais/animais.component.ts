import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html'
})
export class AnimaisComponent implements OnInit {

  animais: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAnimais().subscribe((res: any) => {
      this.animais = res;
    });
  }
}