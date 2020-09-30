import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCatalogRoutingModule } from './list-catalog-routing.module';
import { ListCatalogComponent } from './list-catalog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ListCatalogComponent],
  imports: [
    CommonModule,
    ListCatalogRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],  
  exports:[],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ListCatalogModule { }
