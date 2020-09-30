import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { GetCharactersInformation } from 'src/app/Models/GetCharactersInformation.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService,private formBuilder: FormBuilder) { }
  currentWord: string
  characters: GetCharactersInformation
  notFound: boolean
  pagination: FormGroup
  currentPage: number
  totalPages: number
  searchCharacter:FormGroup

  ngOnInit(): void {
    this.currentWord = decodeURI(this.route.snapshot.params.wordSearch);
    console.log("currentWord", this.currentWord)
    this.createForm();
    this.getData('');
  }

  getData(pageNumber?) {
    this.apiService.getCharactersByNameStartsWithWord(this.currentWord, pageNumber.toString()).subscribe(response => {
      if (!(response.characters as any).length) {
        this.notFound = true;
      } else {
        this.characters = response;
        this.currentPage = this.characters.offset;
        this.pagination.patchValue({ pageNumber: this.currentPage + 1 })
        this.totalPages = Math.ceil(this.characters.total / this.characters.limit);
      }
    })
  } 

  performSearch(){
    const data = encodeURI(this.searchCharacter.getRawValue().wordSearch);
  }

  changePage(){
    const pageNumber = this.pagination.getRawValue();  
    this.getData(pageNumber.pageNumber-1);
  }
  nextPage(){
    const pageNumber = this.pagination.getRawValue();  
    this.getData(pageNumber.pageNumber);
  }
  prevPage(){
    const pageNumber = this.pagination.getRawValue();  
    this.getData(pageNumber.pageNumber-2);
  }

  createForm() {
    this.searchCharacter = this.formBuilder.group({
      wordSearch: ['']     
    });
    this.pagination = this.formBuilder.group({
      pageNumber: ['']     
    });

    this.searchCharacter.patchValue({ wordSearch: this.currentWord })
   
  }

  fnEncodeURI(data){
    return encodeURI(data);
  }

}
