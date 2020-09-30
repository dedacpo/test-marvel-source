import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchCharacterComponent } from './search-character.component';


const routes: Routes = [
  {
    path: '',
    component: SearchCharacterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCharacterRoutingModule { }
