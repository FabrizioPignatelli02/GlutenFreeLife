import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allRistoranti!: any;
  utente!: AuthData | null;
  boolMangiaAlRistorante!: any;
  boolOrdina!: any;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    const mangia = sessionStorage.getItem('mangia');
    const ordina = sessionStorage.getItem('ordina');
    if (mangia === 'true') {
      this.mangiaAlRistorante();
    }
    if (ordina === 'true') {
      this.ordinaAlRistorante();
    }
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
    const userToken = localStorage.getItem('user');
    if (userToken) {
    }
    this.allRestaurant();
  }

  mangiaAlRistorante() {
    sessionStorage.setItem('mangia', 'true');
    sessionStorage.setItem('ordina', 'false');
    this.boolMangiaAlRistorante = sessionStorage.getItem('mangia');
  }

  ordinaAlRistorante() {
    sessionStorage.setItem('ordina', 'true');
    sessionStorage.setItem('mangia', 'false');
    this.boolOrdina = sessionStorage.getItem('ordina');
  }

  tornaIndietro() {
    this.boolMangiaAlRistorante = '';
    this.boolOrdina = '';
    sessionStorage.setItem('mangia', 'false');
    sessionStorage.setItem('ordina', 'false');
    this.router.navigate(['/']);
  }

  allRestaurant() {
    const apiUrl = environment.restaurantApi;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((ristoranti) => {
        console.log(ristoranti);
        this.allRistoranti = ristoranti;
      });
  }

  dettaglioRistorante(id: number) {
    this.router.navigate([`/dettaglio/` + id]);
  }
}
