import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ristorante } from 'src/app/interface/ristorante';

@Component({
  selector: 'app-ristoranti',
  templateUrl: './ristoranti.component.html',
  styleUrls: ['./ristoranti.component.scss'],
})
export class RistorantiComponent implements OnInit {
  allRistoranti!: any;
  constructor() {}

  ngOnInit(): void {
    const apiUrl = environment.restaurantApi;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((ristoranti) => {
        console.log(ristoranti);
        this.allRistoranti = ristoranti;
      });
  }
}
