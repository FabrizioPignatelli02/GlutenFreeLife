import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { AuthData } from 'src/app/auth/auth-data';
import { Ristorante } from 'src/app/interface/ristorante';

@Component({
  selector: 'app-dettaglio-ristorante',
  templateUrl: './dettaglio-ristorante.component.html',
  styleUrls: ['./dettaglio-ristorante.component.scss'],
})
export class DettaglioRistoranteComponent implements OnInit {
  utente!: AuthData | null;
  formPrenotazione!: FormGroup;
  id!: number;
  ordina!: any;
  mangia!: any;
  ristorante!: Ristorante;
  ApiId!: any;
  Menu!: any;
  itemCarrello!: number;
  item!: any;
  carrello: any[] = [];
  listCarrelloArray!: any;
  dataDiOggi!: any;
  constructor(private route: ActivatedRoute, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.dataDiOggi = new Date().toISOString().slice(0, 10);
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });

    this.id = +this.route.snapshot.paramMap.get('id')!;
    const apiUrl = environment.restaurantApi;
    fetch(apiUrl + '/' + this.id)
      .then((resp) => resp.json())
      .then((ristoranti) => {
        this.ristorante = ristoranti;
        (this.formPrenotazione = new FormGroup({
          data: new FormControl(null, [Validators.required]),
          ora: new FormControl(null, [Validators.required]),
          ospiti: new FormControl(null, [Validators.required]),
          nome: new FormControl(this.utente?.user.nome),
          rist: new FormControl(this.ristorante?.name),
          idUser: new FormControl(this.utente?.user.id),
        })),
          catchError(this.errors);
        sessionStorage.setItem('ristorante', JSON.stringify(this.ristorante));
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

  prenotazione() {
    this.authSrv.registerPrenotazioni(this.formPrenotazione.value).subscribe(),
      catchError(this.errors);
  }

  reset() {
    sessionStorage.setItem('car', '');
    sessionStorage.setItem('carrello', '');
    sessionStorage.setItem('ristorante', '');
    this.carrello = [];
  }

  private errors(err: any) {
    console.log(err);
    alert(err.error);
    switch (err.error) {
      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
