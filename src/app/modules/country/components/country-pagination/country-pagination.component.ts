import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-country-pagination',
  templateUrl: './country-pagination.component.html',
  styleUrls: ['./country-pagination.component.scss']
})
export class CountryPaginationComponent implements OnInit {

  @Input() totalPages: number = 0;
  @Input() activePage: number = 1;
  @Output() pageClicked : EventEmitter<any> = new EventEmitter();

  displayPages = [];
  constructor() { }

  ngOnInit(): void {

  }

  goto(buttonType: string) {

    const activePage = +this.activePage;
    const totalPages = +this.totalPages;

    let clickedPageNumber = 1;
    switch(buttonType) {
      case 'first':
        clickedPageNumber = 1;
        break;
      case 'previous':
        if (activePage === 1) {
          clickedPageNumber = 1;
        } else {
          clickedPageNumber = activePage - 1;
        }
        break;
        case 'next':
          if (activePage === totalPages  || activePage > totalPages) {
            clickedPageNumber = totalPages;
          } else {
            clickedPageNumber = activePage + 1;
          }
          break;
          case 'last':
            clickedPageNumber = totalPages;
            break;
      default:
    
    }
    this.pageClicked.emit(clickedPageNumber);
  }


}
