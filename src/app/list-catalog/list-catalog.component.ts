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

  name:ConstrainDOMString

  ngOnInit() {
    this.createForm();
    this.getData('');


  }

  getData(pageNumber?) {
    if (this.router.url.includes('comics-character'))
      this.apiService.getComicsByCharacterId(this.route.snapshot.params.id, pageNumber.toString()).subscribe(response => {
        this.setData(response);
        this.name = decodeURI(this.route.snapshot.params.name)
      })
    else
      this.apiService.getComics(pageNumber.toString()).subscribe(response => {
        this.setData(response);
      })
  }

  setData(response) {
    this.comics = response;
    this.currentPage = this.comics.offset;
    this.pagination.patchValue({ pageNumber: this.currentPage + 1 })
    this.totalPages = Math.ceil(this.comics.total / this.comics.limit);
  }

  performSearch() {
    console.log("aqui")
    const data = encodeURI(this.searchCharacter.getRawValue().wordSearch);
    this.router.navigate(['search-character', data]);
    console.log("oi")
  }

  changePage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber - 1);
  }
  nextPage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber);
  }
  prevPage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber - 2);
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
