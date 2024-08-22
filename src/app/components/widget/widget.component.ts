import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../models/ICountry';
import { CountriesService } from '../../services/countries.service';
import { IHoliday } from '../../models/IHoliday';
import { AsyncPipe, CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { empty, first, isEmpty, Observable } from 'rxjs';
import { WidgetCardComponent } from './widget-card/widget-card.component';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgForOf, RouterLink, DatePipe, WidgetCardComponent],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent implements OnInit {
  combinedData!: { country: ICountry; holidays: IHoliday[] }[];
  isCountryCodesEmpty!: boolean;

  constructor(private countryService: CountriesService) {}

  ngOnInit() {
    this.isCountryCodesEmpty = this.countryService.getCountryCodes().length === 0;
    this.initializeData(this.isCountryCodesEmpty);
  }

  initializeData(empty: boolean) {
    if (empty) {
      this.countryService.setCountryCodes(3).subscribe(data => {
        this.combinedData = data;
      });
    } else {
      this.combinedData = this.countryService.getCountryCodes();
    }
  }
}
