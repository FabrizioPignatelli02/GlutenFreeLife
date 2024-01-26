import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-ristoranti',
  templateUrl: './ristoranti.component.html',
  styleUrls: ['./ristoranti.component.scss'],
})
export class RistorantiComponent implements OnInit {
  allRistoranti!: any;
  utente!: AuthData | null;
  constructor(private router: Router, private authSrv: AuthService) {}

  ngOnInit(): void {
    const apiUrl = environment.restaurantApi;
    fetch(apiUrl)
      .then((resp) => resp.json())
      .then((ristoranti) => {
        console.log(ristoranti);
        this.allRistoranti = ristoranti;
      });
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
  }
}
