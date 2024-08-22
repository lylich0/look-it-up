import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ICountry } from '../../../models/ICountry';
import { IHoliday } from '../../../models/IHoliday';

@Component({
  selector: 'app-widget-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './widget-card.component.html',
  styleUrl: './widget-card.component.css'
})
export class WidgetCardComponent {
  @Input() data!: { country: ICountry; holidays: IHoliday[] };
}
