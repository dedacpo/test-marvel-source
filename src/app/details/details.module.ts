import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  imports: [
    CommonModule,
    DetailsRoutingModule,
    SlickCarouselModule
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
