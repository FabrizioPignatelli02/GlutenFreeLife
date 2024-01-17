import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  utente!: AuthData | null;
  boolMangiaAlRistorante!: boolean;
  boolOrdina!: boolean;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.boolMangiaAlRistorante = false;
    this.boolOrdina = false;
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
    const userToken = localStorage.getItem('user');
    if (userToken) {
    }
  }

  mangiaAlRistorante() {
    this.boolMangiaAlRistorante = true;
  }

  ordina() {
    this.boolOrdina = true;
  }

  tornaIndietro() {
    this.boolMangiaAlRistorante = false;
    this.boolOrdina = false;
    this.router.navigate(['/']);
  }
}
