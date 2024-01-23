import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  carrello: any[] = [];
  listCarrelloArray!: any;
  totalPayment: number = 0;
  itemCarrello: any = sessionStorage.getItem('carrello');

  constructor() {}

  ngOnInit(): void {
    this.listCarrelloArray = sessionStorage.getItem('car');
    this.carrello = JSON.parse(this.listCarrelloArray);
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
}
