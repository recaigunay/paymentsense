import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { SearchModel } from '../../models/searchModel';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-container',
  templateUrl: './country-container.component.html',
  styleUrls: ['./country-container.component.scss']
})
export class CountryContainerComponent implements OnInit {
  unsubscription: Subject<any> = new Subject();
  countryList = [];
  countryListFiltered = [];
  countrySearchList = [];
  isLoading = false;
  totalPages = 0;
  activePage = 1;
  pageSize = 20;
  searchKey = '';
  breakPoint = null;

  constructor(private countryService: CountryService,
    private router: Router,
    private breakPointService: BreakpointService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initIsLoading();
    this.getScreenSize();
    this.getAllCountries();
  }

  pageClicked(clickedPageNumber: any) {
    const pageNumber = clickedPageNumber ? clickedPageNumber.toString().trim() : 1;
    this.activePage = parseInt(pageNumber);
    const list = this.searchKey ? this.countrySearchList : this.countryList;
    this.updatePaging(list, this.activePage);
  }

  initIsLoading() {
    this.countryService.isLoading.pipe(takeUntil(this.unsubscription)).subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

  getAllCountries() {
    this.countryService.isLoading.next(true);
    this.countryService.getAllCountries().pipe(takeUntil(this.unsubscription)).subscribe(countries => {
      if (countries) {
        this.countryList = countries;
        this.updatePaging(countries, this.activePage);
      }
    },
    err => this.countryService.isLoading.next(false))
  }

  updatePaging(list: any[], activePage: number) {
    const start = this.pageSize * (activePage - 1);
    const end = this.pageSize * (activePage - 1) + this.pageSize;
    this.countryListFiltered = list.slice(start, end);
    this.totalPages = (list.length / this.pageSize) |0;
  }

  ngOnDestroy() {
    this.unsubscription.next();
    this.unsubscription.complete();
  }

  selectedCountryEvent(event) {
    this.countryService.selectedCountry.next(event);
  }

  getScreenSize() {
    this.breakPointService.getBreakPoint().pipe(takeUntil(this.unsubscription)).subscribe(result => {
      if (result) {
        this.breakPoint = result;
      }
    })
  }

  searchKeyChange(searchObject: SearchModel) {
    this.searchKey = '';
    this.activePage = 1;
    if (this.countryList) {
      this.searchKey = searchObject.searchKey ? searchObject.searchKey.toLowerCase() : '';
      // this.countrySearchList = this.countryList.filter(item => item['name'].toLowerCase().indexOf(this.searchKey) > -1 );
      if (this.searchKey) {
        this.countryService.searchCountry(searchObject).subscribe(result => {
          if (result) {
            this.countrySearchList = result;
            this.updatePaging(this.countrySearchList, this.activePage);
          }
        })
      } else {
        this.updatePaging(this.countryList, this.activePage);
      }
    }
  }

}