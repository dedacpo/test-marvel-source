import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCatalogRoutingModule } from './list-catalog-routing.module';
import { ListCatalogComponent } from './list-catalog.component';

@NgModule({
  imports: [
    CommonModule,
    ListCatalogRoutingModule
  ],
  declarations: [ListCatalogComponent]
})
export class ListCatalogModule { }
