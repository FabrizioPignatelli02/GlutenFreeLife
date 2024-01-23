import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/auth/auth-data';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  utente!: AuthData | null;
  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((user) => {
      this.utente = user;
    });
  }

  logout() {
    this.authSrv.logout();
    sessionStorage.setItem('ordina', 'false');
    sessionStorage.setItem('mangia', 'false');
  }

  profilo(id: number) {
    this.router.navigate([`/profile/` + id]);
  }
}
