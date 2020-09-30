import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)
  },
  {
    path: 'search-character/:wordSearch',
    loadChildren: () => import('./search-character/search-character.module').then(m => m.SearchCharacterModule)
  },
  {
    path: 'comics-character/:id/:name',
    loadChildren: () => import('./list-catalog/list-catalog.module').then(m => m.ListCatalogModule)
  },
  {
    path: '',
    loadChildren: () => import('./list-catalog/list-catalog.module').then(m => m.ListCatalogModule)
  }, 
  {
    path: '**',redirectTo: ''   
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
