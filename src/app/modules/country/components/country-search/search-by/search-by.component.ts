import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { animationComeInFromTop } from 'src/app/animations';

@Component({
  selector: 'app-search-by',
  templateUrl: './search-by.component.html',
  styleUrls: ['./search-by.component.scss'],
  animations: [animationComeInFromTop]
})
export class SearchByComponent implements OnInit {
  @Output() selectedSearchByEvent = new EventEmitter();
  isOpen = false;
  isSearchByEnabled = false;

  options = [
    {name: 'By Country Name', value: '1'},
    {name: 'By Capital City', value: '2'},
    {name: 'By Region', value: '3'},
  ];
  selectedSearchBy = this.options[0].value;
  selectedSearchByText = this.options[0].name;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isSearchByEnabled = true;
    }

    this.selectedSearchByEvent.emit({selectedSearchBy: this.selectedSearchBy, selectedSearchByText: this.selectedSearchByText})
  }

  public clickSearchByOptions() {
    this.isOpen = !this.isOpen;
  }

  radioChange($event: MatRadioChange) {
    this.selectedSearchByText = this.options.find(item => item.value === $event.value).name;
    this.selectedSearchByEvent.emit({selectedSearchBy: this.selectedSearchBy, selectedSearchByText: this.selectedSearchByText});
    this.clickSearchByOptions();
  }

}
