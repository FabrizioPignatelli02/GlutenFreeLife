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
  ordina!: any;
  mangia!: any;
  ristorante!: any;
  ApiId!: any;
  Menu!: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const apiUrl = environment.restaurantApi;
    fetch(apiUrl + '/' + this.id)
      .then((resp) => resp.json())
      .then((ristoranti) => {
        this.ristorante = ristoranti;
      });
    this.ordina = sessionStorage.getItem('ordina');
    this.mangia = sessionStorage.getItem('mangia');
    this.caricaMenu();
  }

  caricaMenu() {
    this.ApiId = environment.restaurantApi + '/' + this.id + '/' + 'menu';
    console.log('ApiID', this.ApiId);
    fetch(this.ApiId)
      .then((resp) => resp.json())
      .then((menu) => {
        console.log('Menu:', menu);
        this.Menu = menu;
      });
  }
}
