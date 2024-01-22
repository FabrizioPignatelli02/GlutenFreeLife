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
  itemCarrello!: number;
  item!: any;
  carrello: any[] = [];
  listCarrelloArray!: any;
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
    this.caricaArray();
    console.log('itemcarrello:', this.itemCarrello);
    if (this.itemCarrello === undefined) {
      this.itemCarrello = this.item;
    }
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

  addItemCarrello(name: string, price: number) {
    const iCarrello = sessionStorage.getItem('carrello');
    if (iCarrello === '') {
      this.itemCarrello = 0;
      sessionStorage.setItem('carrello', this.itemCarrello.toString());
    }
    this.itemCarrello++;
    sessionStorage.setItem('carrello', this.itemCarrello.toString());
    this.item = sessionStorage.getItem('carrello');
    this.carrello.push({ name, price });
    sessionStorage.setItem('car', JSON.stringify(this.carrello));
    console.log('itemcarrelloPUSH:', this.itemCarrello);
  }

  removeItemCarrello(name: string, price: number, i: number) {
    this.itemCarrello--;
    sessionStorage.setItem('carrello', this.itemCarrello.toString());
    this.item = sessionStorage.getItem('carrello');
    this.carrello.splice(i, 1);
    sessionStorage.setItem('car', JSON.stringify(this.carrello));
  }

  caricaArray() {
    this.item = sessionStorage.getItem('carrello');
    this.listCarrelloArray = sessionStorage.getItem('car');
    this.carrello = JSON.parse(this.listCarrelloArray);
  }

  reset() {
    sessionStorage.setItem('car', '');
    sessionStorage.setItem('carrello', '');
    this.carrello = [];
  }
}
