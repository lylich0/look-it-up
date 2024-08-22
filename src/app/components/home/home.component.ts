import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, WidgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
