import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { GetCharactersInformation } from 'src/app/Models/GetCharactersInformation.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-character',
  templateUrl: './search-character.component.html',
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService, private formBuilder: FormBuilder, private router: Router) { }
  currentWord: string
  characters: GetCharactersInformation
  notFound: boolean
  pagination: FormGroup
  currentPage: number = 0
  totalPages: number
  searchCharacter: FormGroup

  ngOnInit(): void {
    this.currentWord = decodeURI(this.route.snapshot.params.wordSearch);
    this.createForm();
    this.getData('');
  }

  getData(pageNumber?) {
    this.apiService.getCharactersByNameStartsWithWord(this.currentWord, pageNumber.toString()).subscribe(response => {
      if (!(response.characters as any).length) {
        this.notFound = true;
        return
      }
      this.characters = response;
      this.currentPage = this.characters.offset / this.characters.limit;
      this.pagination.patchValue({ pageNumber: this.currentPage + 1 })
      this.totalPages = Math.ceil(this.characters.total / this.characters.limit);

    })
  }

  performSearch() {
    this.currentWord = this.searchCharacter.getRawValue().wordSearch;
    this.router.navigate(['/search-character', encodeURI(this.currentWord)]);
    this.getData('')
  }

  changePage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber * this.characters.limit - this.characters.limit);
  }
  nextPage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(pageNumber.pageNumber * this.characters.limit);
  }
  prevPage() {
    const pageNumber = this.pagination.getRawValue();
    this.getData(((pageNumber.pageNumber - 1) * this.characters.limit - this.characters.limit));
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

  fnEncodeURI(data) {
    return encodeURI(data);
  }

}
