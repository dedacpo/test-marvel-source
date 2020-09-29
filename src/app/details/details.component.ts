import { Component, OnInit } from '@angular/core';
 //import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.apiService.getComics().subscribe(response => {
    //   console.log("response", response);
    // })
  }

}
