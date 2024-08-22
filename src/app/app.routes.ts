import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryPageComponent } from './components/country-page/country-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'details/:countryCode', component: CountryPageComponent }
];
