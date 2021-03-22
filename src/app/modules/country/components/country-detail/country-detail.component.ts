import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { of } from 'rxjs/internal/observable/of';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit, OnDestroy {
  selectedCountry = null;
  selectedCountry$;
  bordersObs = [];
  borderCountries = [];
  
  unsubscription: Subject<any> = new Subject();
  constructor(private router: Router, private route: ActivatedRoute, private countryService: CountryService) { }

  ngOnInit() {
    this.countryService.selectedCountry.pipe(takeUntil(this.unsubscription),
    switchMap(selectedCountry => {
      const alphaCode = this.route.snapshot.params.name;
      if (!selectedCountry && alphaCode) {
        return this.countryService.getCountryDetail(alphaCode);
      } else {
        return of(selectedCountry);
      }
    }),
    map(selectedCountry => this.selectedCountry = selectedCountry),
    concatMap(selectedCountry => {
      if (selectedCountry && selectedCountry.borders) {
        selectedCountry.borders.map(borderItemCountryCode => {
          if (borderItemCountryCode) {
            this.bordersObs.push(this.countryService.getCountryDetail(borderItemCountryCode))
          }
        });

        return forkJoin(
          this.bordersObs
        )
        
      } else {
        return EMPTY;
      }
    })
    ).subscribe(result => {
      this.borderCountries = result;
    });

  }

  ngOnDestroy() {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  
  goBack() {
    this.router.navigate([`../`], { relativeTo: this.route });
  }

  gotoDirection(lat: number, long: number) {
    if (window && typeof window !== 'undefined') {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
      window.open(url, '_blank');
    }
  }

}
