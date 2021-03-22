import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'countries',
    loadChildren: () => import('./modules/country/country.module').then(m => m.CountryModule)
  },
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
