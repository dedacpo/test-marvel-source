import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { ComicDetails } from 'src/app/Models/ComicDetails.model';
 //import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private apiService: ApiServiceService, private route: ActivatedRoute) { }
  id:number

  slideConfig = {
    slidesToShow: 1, 
    slidesToScroll: 1,
    arrows: true
  };

  details:ComicDetails
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.apiService.getComicById(this.id).subscribe(response => {
        this.details = response[0]
    })
  }

}
