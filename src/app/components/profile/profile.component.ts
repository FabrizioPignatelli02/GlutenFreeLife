import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  id!: number;
  apiUrl!: string;
  ordiniAll!: any;
  prenotazioniAll!: any;
  utente!: AuthData | null;
  data!: Date;
  constructor(private route: ActivatedRoute, private authSrv: AuthService) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.apiUrl = environment.userUrl + 'ordini';
    fetch(this.apiUrl)
      .then((resp) => resp.json())
      .then((ordini) => {
        this.ordiniAll = ordini;
      });
    this.apiUrl = environment.userUrl + 'prenotazioni';
    fetch(this.apiUrl)
      .then((resp) => resp.json())
      .then((prenotazioni) => {
        this.prenotazioniAll = prenotazioni;
      });
  }
}
