import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { ICountry } from '../../models/ICountry';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { IHoliday } from '../../models/IHoliday';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgForOf, DatePipe],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {
  protected readonly startYear = environment.startYear;
  protected readonly endYear = environment.endYear;

  country$!: Observable<ICountry>;
  holidays$!: Observable<IHoliday[]>;

  currentYear: number;
  countryCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {
    this.currentYear = this.countryService.currentYear;
  }

  ngOnInit() {
    this.countryCode = this.route.snapshot.paramMap.get('countryCode')!;

    this.country$ = this.countryService.getCountry(this.countryCode);
    this.holidays$ = this.countryService.getPublicHolidaysByYear(this.countryCode, this.currentYear);
  }

  changeYear(direction: 'previous' | 'next') {
    if (direction === 'previous' && this.currentYear > this.startYear) {
      this.currentYear -= 1;
    } else if (direction === 'next' && this.currentYear < this.endYear) {
      this.currentYear += 1;
    }
    this.updateHolidays();
  }

  updateHolidays() {
    this.holidays$ = this.countryService.getPublicHolidaysByYear(this.countryCode, this.currentYear);
  }
}
