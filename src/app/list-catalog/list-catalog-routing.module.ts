import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCatalogComponent } from './list-catalog.component';


const routes: Routes = [
  {
    path: '',
    component: ListCatalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCatalogRoutingModule { }
