import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MethodsService } from '../../services/methods.service';
import { cityDetails } from '../../cityDetails'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  control = new FormControl();
  cities: string[];
  public forecastOfFavoritesCities : cityDetails[];
  filteredStreets: Observable<string[]>;
  constructor(public _service: MethodsService) { }

  ngOnInit() {
 
 

  }


 



}
