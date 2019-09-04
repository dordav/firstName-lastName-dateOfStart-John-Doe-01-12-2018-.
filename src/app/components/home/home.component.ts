import { Component, OnInit } from '@angular/core';
import { MethodsService } from '../../services/methods.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  control = new FormControl();
  cities: string[];
  filteredCities: Observable<string[]>;
  searchValue:any;

  constructor(public _service: MethodsService) { }
  ngOnInit() {
    this._service.getCurrentWeatherByLocationKey('215854');
    this._service.getCurrentWeatherLocationKey('215854');
    this.filteredCities = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  public _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    this._service.autoCompleteCitiesNames(filterValue)

    this.cities = this._service.citySearchResultsArr;
    this._service.citySearchResultsArr = []
    if (this.cities !== undefined) {

      return this.cities.filter(city => this._normalizeValue(city).includes(filterValue));
    }
  }

  public _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');

  }
}
