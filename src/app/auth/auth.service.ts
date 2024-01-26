import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  userUrl = environment.userUrl;

  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user$ = this.authSubj.asObservable();
  utente!: AuthData;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.userUrl}login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        this.utente = data;
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['/']);
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['/']);
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      this.router.navigate(['/']);
      sessionStorage.setItem('mangia', 'false');
      sessionStorage.setItem('ordina', 'false');
      return;
    }
    this.authSubj.next(userData);
  }

  register(data: { nome: string; email: string; password: string }) {
    return this.http.post(`${this.userUrl}users`, data).pipe(
      tap(() => {
        this.router.navigate(['/login']), catchError(this.errors);
      }),
      catchError(this.errors)
    );
  }

  registerPost(data: {
    nome: string;
    array: any;
    idUser: number;
    time: string;
    date: string;
  }) {
    return this.http.post(`${this.userUrl}ordini`, data).pipe(
      tap(() => {}),
      catchError(this.errors)
    );
  }

  registerPrenotazioni(data: {
    data: string;
    ora: string;
    ospiti: string;
    nome: string;
    rist: string;
    idUser: number;
    id: number;
  }) {
    return this.http.post(`${this.userUrl}prenotazioni`, data).pipe(
      tap(() => {
        catchError(this.errors);
      }),
      catchError(this.errors)
    );
  }

  registerRecensioni(data: {
    nomeCliente: string;
    commento: string;
    idRistorante: number;
  }) {
    return this.http.post(`${this.userUrl}recensioni`, data).pipe(
      tap(() => {
        catchError(this.errors);
      }),
      catchError(this.errors)
    );
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  private errors(err: any) {
    const allert = document.getElementById('alert');
    const p = document.getElementById('p-alert') as HTMLParagraphElement;
    const button = document.getElementById('button-alert') as HTMLButtonElement;
    button.innerText = '❌';
    button.addEventListener('click', () => {
      allert?.classList.add('d-none');
      allert?.classList.remove('d-flex');
    });
    p.innerText = err.error;
    allert?.appendChild(p);
    allert?.appendChild(button);
    allert?.classList.remove('d-none');
    allert?.classList.add('d-flex');

    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email format is invalid':
        return throwError('Formato mail non valido');
        break;

      case 'Cannot find user':
        return throwError('Utente inesistente');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }
}
