import { State } from './../common/state';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from '../common/country';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private contriesUlr = 'http://localhost:8080/api/countries';
  private statesUlr = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<GetResponseCountries>(this.contriesUlr).pipe(
      map(response => response._embedded.countries)
    ) ;
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const searchStateurl = `${this.statesUlr}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStateurl).pipe(
      map(response => response._embedded.states)
    ) ;
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
      states: State[];
    };
  }
