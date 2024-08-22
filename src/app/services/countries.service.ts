import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ICountries } from '../models/ICountries';
import { ICountry } from '../models/ICountry';
import { IHoliday } from '../models/IHoliday';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  url: string = environment.baseUrl;

  countryCodes: { country: ICountry; holidays: IHoliday[] }[] = [];

  constructor(private http: HttpClient) {}

  /** GET all countries */
  getCountries(): Observable<ICountries[]> {
    return this.http.get<ICountries[]>(`${this.url}/AvailableCountries`);
  }

  /** GET country by country code */
  getCountry(countryCode: string): Observable<ICountry> {
    return this.http.get<ICountry>(`${this.url}/CountryInfo/${countryCode}`);
  }

  /** GET next holidays by country */
  getNextHolidays(countryCode: string): Observable<IHoliday[]> {
    return this.http.get<IHoliday[]>(`${this.url}/NextPublicHolidays/${countryCode}`);
  }

  /** GET holidays list for country and year */
  getPublicHolidaysByYear(countryCode: string, year: number): Observable<IHoliday[]> {
    return this.http.get<IHoliday[]>(`${this.url}/PublicHolidays/${year}/${countryCode}`);
  }

  /** GET country codes */
  getCountryCodes(): { country: ICountry; holidays: IHoliday[] }[] {
    return this.countryCodes;
  }

  /** GET current year */
  get currentYear() {
    return new Date().getFullYear();
  }

  /** SET country codes */
  setCountryCodes(amount: number): Observable<{ country: ICountry; holidays: IHoliday[] }[]> {
    return this.generateRandomCountryCodes(amount).pipe(
      switchMap(codes =>
        forkJoin({
          countries: forkJoin(codes.map(code => this.getCountry(code))),
          holidays: forkJoin(codes.map(code => this.getNextHolidays(code)))
        })
      ),
      map(results => {
        const combinedData = results.countries.map((country, index) => ({
          country,
          holidays: results.holidays[index]
        }));
        this.countryCodes = combinedData;
        return this.countryCodes;
      })
    );
  }

  /** Search for countries whose names contain search term */
  searchCountries(term: string): Observable<ICountries[]> {
    return this.getCountries().pipe(map(countries => countries.filter(country => country.name.toLowerCase().includes(term.toLowerCase()))));
  }

  /** Generate random country codes */
  generateRandomCountryCodes(amount: number): Observable<string[]> {
    return this.getCountries().pipe(
      map(countries => {
        const codes: string[] = [];
        while (codes.length < amount) {
          const randomIndex = Math.floor(Math.random() * countries.length);
          const code = countries[randomIndex].countryCode;
          if (!codes.includes(code)) {
            codes.push(code);
          }
        }
        return codes;
      })
    );
  }
}
