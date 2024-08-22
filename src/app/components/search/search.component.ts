import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ICountries } from '../../models/ICountries';
import { debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  private searchTerms = new Subject<string>();
  results$!: Observable<ICountries[]>;

  constructor(private countryService: CountriesService) {}

  ngOnInit() {
    this.results$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      startWith(''),
      switchMap((term: string) => this.countryService.searchCountries(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term);
  }
}
