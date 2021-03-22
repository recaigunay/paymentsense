import { Routes } from "@angular/router";
import { CountryContainerComponent } from "./components/country-container/country-container.component";
import { CountryDetailComponent } from "./components/country-detail/country-detail.component";

const routes: Routes = [
  {
    path: ':name',
    component: CountryDetailComponent,
    data: {
      title: 'Country Detail',
    },
  },
  {
    path: '',
    component: CountryContainerComponent,
    data:
    {
      title: 'Countries',
    },
  }

]

export const COUNTRY_ROUTES = routes;