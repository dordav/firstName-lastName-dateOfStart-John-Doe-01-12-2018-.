import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { city } from '../city'
import { cityDetails } from '../cityDetails'
import { timeout } from 'rxjs/operators';
import { interval } from 'rxjs';
import { currentWeather } from '../currentWeather'
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MethodsService {
  constructor(private _http: Http) { }
  public getCurrentWeather = []
  public text: string;
  public forecastArr = []
  public citySearchResultsArr: string[] = [];
  public citysName: string;
  public favoritesCitiesRes: currentWeather[] = [];
  public city1: city;
  public cityNameSearch: any;
  public favorites: city[] = [];
  public locationKey: number;
  public followOrUnfollow = 'unfollow'

  public apiKey: string = "8UXq4kPAmYD3TQi9iu63vJpsUq7GDTX4";
  public get5DaysWeatherURL: string = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + this.locationKey + "?apikey=" + this.apiKey + "&language=en&metric=true";
  public getLocationKeyURL: string = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + this.apiKey + "&q="
  public getAutoCompleteCitiesNamesURL: string = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + this.apiKey + "&q="

  swalwarning(err: any) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: err + '!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }
  addOrRemoveFavorite() {
    let isExist: boolean = false;
    this.favorites.forEach(element => {
      if (element.id === this.locationKey)
        isExist = true
        this.followOrUnfollow='follow'
    });
    if (isExist === false) {
      for (let i = 0; i <= this.favorites.length; i++) {
        if (typeof this.favorites[i] === 'undefined') {
          this.city1 = new city(this.locationKey, this.citysName)
          this.favorites[i] = this.city1
          break;
        }
      }
    }
  }


  autoCompleteCitiesNames(filterValue) {
    this.citysName = filterValue
    if (filterValue.length >= 2 && filterValue.length <= 5) {
      this._http.get(this.getAutoCompleteCitiesNamesURL + filterValue).subscribe(
        (response) => {
          let res: cityDetails[] = response.json()
          res.forEach(element => {
            if (element.LocalizedName != undefined) {
              this.citySearchResultsArr.push(element.LocalizedName)
            }
          });
        }, (error) => {
          this.swalwarning(error)
        }
      )
    }
  }

  getLocationKey(searchValue) {
    this._http.get(this.getLocationKeyURL + searchValue).subscribe(
      (response) => {
        let res = response.json()
        this.locationKey = res[0].Key
        let country = res[0].Country.LocalizedName
        this.getCurrentWeatherByLocationKey(res[0].Key)
        this.getCurrentWeatherLocationKey(res[0].Key)
        return response;

      }, (error) => {
        this.swalwarning(error)

      }

    )
  }

  getCurrentWeatherByLocationKey(locationKey) {
    this.favorites.forEach(element => {
      if(element.id===locationKey){
        this.followOrUnfollow='follow'
      }else{
        this.followOrUnfollow='unfollow'
      }
    });
    this._http.get("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locationKey + "?apikey=" + this.apiKey + "&language=en&metric=true").subscribe(
      (response) => {
        let res = response.json();
        this.forecastArr = res.DailyForecasts
        return res.DailyForecasts;

      }, (error) => {
        this.swalwarning(error)
      }
    )
  }

  getCurrentWeatherLocationKey(locationKey) {
    this._http.get("http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=" + this.apiKey).subscribe(
      (response) => {
        let res = response.json();
        this.getCurrentWeather = res;
        return res;

      }, (error) => {
        this.swalwarning(error)
      }
    )
  }
  getCurrentWeatherLocationKeyForFavorites(locationKey, name) {
    this._http.get("http://dataservice.accuweather.com/currentconditions/v1/" + locationKey + "?apikey=" + this.apiKey).subscribe(
      (response) => {
        let res: currentWeather[] = response.json()
        for (let i = 0; i < 3; i++) {
          const seconds = interval(1000)
          seconds.pipe(timeout(1100))
          if (res !== undefined) {
            res[0].cityName = name;
            this.favoritesCitiesRes.push(res[0])
            break;
          }
        }

      }, (error) => {
        this.swalwarning(error)
      }
    )
  }




}
