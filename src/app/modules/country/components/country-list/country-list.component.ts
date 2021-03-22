import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  @Input() countryList: any[] = [];
  @Input() countrySearchList: any[] = [];
  @Input() searchKey = '';
  @Input() isLoading = false;
  @Output() selectedCountryEvent = new EventEmitter();
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  navigateToDetail(detailItem: any) {
    this.selectedCountryEvent.emit(detailItem);
    this.router.navigate([detailItem.alpha3Code], { relativeTo: this.route })
  }

}
