import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dettaglio-ristorante',
  templateUrl: './dettaglio-ristorante.component.html',
  styleUrls: ['./dettaglio-ristorante.component.scss'],
})
export class DettaglioRistoranteComponent implements OnInit {
  id!: number;
  ristorante!: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const apiUrl = environment.restaurantApi;
    fetch(apiUrl + '/' + this.id)
      .then((resp) => resp.json())
      .then((ristoranti) => {
        this.ristorante = ristoranti;
      });
  }
}
