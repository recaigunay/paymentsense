import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { apiConfig } from './apiConfig';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { SearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  isLoading = new BehaviorSubject(false);
  selectedCountry = new BehaviorSubject<any>(null);
  countryListUrl: string = apiConfig.countries;
  countryListByNameUrl: string = apiConfig.countriesByName;
  countryListByCapitalUrl: string = apiConfig.countriesByCapital;
  countryListByRegionUrl: string = apiConfig.countriesByRegion;
  countryDetailUrl: string = apiConfig.countryDetailByAlpha;
  constructor(private http: HttpClient) { 

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.isLoading.next(false);
      return of(result as T);
    };
  }

  
  getAllCountries(): Observable<any[]> {
    const apiUrl = this.countryListUrl;
    return this.http.get<any[]>(apiUrl)
      .pipe(
        map(list =>  {
          this.isLoading.next(false);
          return list;
        }),
        catchError(this.handleError('getAllCountries', []))
      );
  }

  searchCountry(searchObject: SearchModel) {
    const searchKey = searchObject.searchKey;
    if (searchObject.searchBy === '1') {
      return this.getCountryListByName(searchKey);
    } else  if (searchObject.searchBy === '2') {
      return this.getCountryListByCapital(searchKey);
    } else  if (searchObject.searchBy === '3') {
      return this.getCountryListByRegion(searchKey);
    }
  }

    
  getCountryListByName(name: string): Observable<any[]> {
    const apiUrl = this.countryListByNameUrl + name;
    return this.http.get<any[]>(apiUrl)
      .pipe(
        map(list =>  {
          this.isLoading.next(false);
          return list;
        }),
        catchError(this.handleError('getCountryListByName', []))
      );
  }

  getCountryListByCapital(capital: string): Observable<any[]> {
    const apiUrl = this.countryListByCapitalUrl + capital;
    return this.http.get<any[]>(apiUrl)
      .pipe(
        map(list =>  {
          this.isLoading.next(false);
          return list;
        }),
        catchError(this.handleError('getCountryListByCapital', []))
      );
  }

  
  getCountryListByRegion(region: string): Observable<any[]> {
    const apiUrl = this.countryListByRegionUrl + region;
    return this.http.get<any[]>(apiUrl)
      .pipe(
        map(list =>  {
          this.isLoading.next(false);
          return list;
        }),
        catchError(this.handleError('getCountryListByRegion', []))
      );
  }

  getCountryDetail(id: string): Observable<any> {
    return this.http.get<any[]>(this.countryDetailUrl + id)
      .pipe(
        map(detail => detail),
        catchError(this.handleError('getCountryDetail', []))
      );
  }
  
}
