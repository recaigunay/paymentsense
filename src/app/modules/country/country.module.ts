import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryPaginationComponent } from './components/country-pagination/country-pagination.component';
import { CountrySearchComponent } from './components/country-search/country-search.component';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryContainerComponent } from './components/country-container/country-container.component';
import { RouterModule } from '@angular/router';
import { COUNTRY_ROUTES } from './country-routes';
import { FormsModule } from '@angular/forms';
import { SearchByComponent } from './components/country-search/search-by/search-by.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
@NgModule({
  declarations: [CountryPaginationComponent, CountrySearchComponent, CountryDetailComponent, CountryListComponent, CountryContainerComponent, SearchByComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(COUNTRY_ROUTES),
  ]
})
export class CountryModule { }
