import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { GetComicsInformation } from 'src/app/Models/GetComicsInformation.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrls: ['./list-catalog.component.scss']
})
export class ListCatalogComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private apiService: ApiServiceService, public router: Router, private route: ActivatedRoute) { }

  searchCharacter: FormGroup
  pagination: FormGroup
  comics: GetComicsInformation
  currentPage: number
  totalPages: number
  notFound:boolean
  name:ConstrainDOMString

  ngOnInit() {
    this.createForm();
    this.getData('');


  }

  getData(pageNumber?) {
    console.log("entrei aqui 0", this.router)
    if (this.router.url.includes('comics-character')){
      console.log("entrei aqui 2")
      this.apiService.getComicsByCharacterId(this.route.snapshot.params.id, pageNumber.toString()).subscribe(response => {
        this.name = decodeURI(this.route.snapshot.params.name)
        if (!(response.comics as any).length) {
          this.notFound = true;
          return;
        } 
        this.setData(response);        
      })
    }
    
    else{
      console.log("entrei aqui 1")
      this.apiService.getComics(pageNumber.toString()).subscribe(response => {
        console.log(response)
        console.log("length",(response.comics as any).length)
        if (!(response.comics as any).length) {
          this.notFound = true;
          return;
        } 
        this.setData(response);
      })
    }
     
  }

  setData(response) {
    this.comics = response;
    this.currentPage = this.comics.offset/this.comics.limit ;
    this.pagination.patchValue({ pageNumber: this.currentPage + 1 })
    this.totalPages = Math.ceil(this.comics.total / this.comics.limit);
  }

  performSearch() {
    const data = encodeURI(this.searchCharacter.getRawValue().wordSearch);
    this.router.navigate(['/search-character', data]);
  }

  changePage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber * this.comics.limit - this.comics.limit);
  }
  nextPage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber * this.comics.limit);
  }
  prevPage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(((pageNumber.pageNumber -1)  * this.comics.limit -this.comics.limit ));
  }

  createForm() {
    this.searchCharacter = this.formBuilder.group({
      wordSearch: ['']
    });
    this.pagination = this.formBuilder.group({
      pageNumber: ['']
    });

  }
}
