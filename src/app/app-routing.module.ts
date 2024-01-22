import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { RistorantiComponent } from './components/ristoranti/ristoranti.component';
import { ChisiamoComponent } from './components/chisiamo/chisiamo.component';
import { LavoraconnoiComponent } from './components/lavoraconnoi/lavoraconnoi.component';
import { DettaglioRistoranteComponent } from './components/dettaglio-ristorante/dettaglio-ristorante.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ristoranti',
    component: RistorantiComponent,
  },
  {
    path: 'chisiamo',
    component: ChisiamoComponent,
  },
  {
    path: 'lavoraconnoi',
    component: LavoraconnoiComponent,
  },
  {
    path: 'dettaglio/:id',
    component: DettaglioRistoranteComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
