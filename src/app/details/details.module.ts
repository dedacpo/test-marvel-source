import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    MatSliderModule
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
