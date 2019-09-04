import { Component, OnInit } from '@angular/core';
import { MethodsService } from '../../services/methods.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public _service : MethodsService) { }

  ngOnInit() {
  }
movingToFavorites(){

  this._service.favorites.forEach(element => {
    this._service.getCurrentWeatherLocationKeyForFavorites(element.id,element.name)
    
  });
}
}
