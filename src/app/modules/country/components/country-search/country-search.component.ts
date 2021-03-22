import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { BreakPointModel } from 'src/app/models/breakpoint-model';
import { SearchModel } from '../../models/searchModel';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {
  @Input() breakPoint: BreakPointModel = null;
  @Output() searchKeyChanged : EventEmitter<SearchModel> = new EventEmitter();
  searchInput;
  searchPlaceHolder = '';
  searchTerms = new Subject<string>();
  public keyUp: Subject<string> = new Subject<string>();
  @ViewChild('myInput', { static: true }) myInput: ElementRef;
  selectedSearchBy = {}
  constructor() { }

  ngOnInit(): void {

    
    let inputBox = this.myInput && this.myInput.nativeElement;
    if (inputBox) {
      fromEvent(inputBox, 'keyup').pipe(
        map((data: Event) => data['currentTarget']['value']),
      ).subscribe((value: string) => {
        this.searchTerms.next(value);
      })
    }

    
    this.searchTerms.pipe(
      debounceTime(600),
    ).subscribe(searchkey => {
      const searchObject: SearchModel = {
        searchKey: searchkey,
        searchBy: this.selectedSearchBy['selectedSearchBy'],
        searchByText: this.selectedSearchBy['selectedSearchByText'],
      }
      this.searchKeyChanged.emit(searchObject);
    });
    
  }

  selectedSearchByEvent(event: any) {
    this.selectedSearchBy = event;
    this.searchPlaceHolder = 'Search Country ' + event.selectedSearchByText;
  }

}
