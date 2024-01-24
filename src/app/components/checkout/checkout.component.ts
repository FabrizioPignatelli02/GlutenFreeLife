import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  carrello: any[] = [];
  listCarrelloArray!: any;
  totalPayment: number = 0;
  rist!: any;
  ristorante!: any;
  utente!: AuthData | null;
  ordineConfermato: boolean = false;
  dataMin!: string;

  itemCarrello: any = sessionStorage.getItem('carrello');

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
    this.dataMin = new Date().toISOString().slice(0, 10);
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
    this.listCarrelloArray = sessionStorage.getItem('car');
    this.carrello = JSON.parse(this.listCarrelloArray);
    this.rist = sessionStorage.getItem('ristorante');
    this.ristorante = JSON.parse(this.rist);
    console.log('Ristorante:', this.ristorante);
    console.log('carrello:', this.carrello);
  }

  removeItemCarrello(name: string, price: number, i: number) {
    this.itemCarrello--;
    sessionStorage.setItem('carrello', this.itemCarrello.toString());
    this.carrello.splice(i, 1);
    sessionStorage.setItem('car', JSON.stringify(this.carrello));
    location.reload();
  }

  totalPay() {
    for (let i = 0; i < this.carrello.length; i++) {
      this.totalPayment += this.carrello[i].price;
    }
    return this.totalPayment;
  }

  makeOrder(nome: string, array: any, idUser: number) {
    const timeControl = document.getElementById('time') as HTMLInputElement;
    const time = timeControl.value;
    const dateControl = document.getElementById('date') as HTMLInputElement;
    const date = dateControl.value;
    this.authSrv.registerPost({ nome, array, idUser, time, date }).subscribe();
    this.ordineConfermato = true;
    this.carrello = [];
    sessionStorage.setItem('ristorante', '');
    sessionStorage.setItem('car', '');
    sessionStorage.setItem('carrello', '');
    sessionStorage.setItem('ordina', 'false');
  }
}
