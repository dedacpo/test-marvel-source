import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetComicsInformation } from 'src/app/Models/GetComicsInformation.model';
import { HelpersService } from 'src/app/shared/helpers.service';
import { GetCharactersInformation } from 'src/app/Models/GetCharactersInformation.model';
import { ComicDetails } from 'src/app/Models/ComicDetails.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  PUBLIC_KEY = '33313dc7eaeacdd085b4da8a0bd9e0f7';
  URL_API = 'https://gateway.marvel.com:443';

  constructor(private http: HttpClient, private helper: HelpersService) { }

  getComics(pageNumber?: number): Observable<GetComicsInformation> {
    return this.http.get<any>(`${this.URL_API}/v1/public/comics`, { params: { apikey: this.PUBLIC_KEY, offset: pageNumber, limit: 40 } })
      .pipe(
      map(response => {
        return this.helper.mapComicsResponse(response);
      })
      )
  }

  getComicById(id: number): Observable<ComicDetails[]> {
    return this.http.get<any>(`${this.URL_API}/v1/public/comics/${id}`, { params: { apikey: this.PUBLIC_KEY } })
    .pipe(
      map(response => {
        return this.helper.mapComicDetailsResponse(response);
      })
      )
  }

  getComicsByCharacterId(characterId: number, pageNumber?: number): Observable<GetComicsInformation> {
    return this.http.get<any>(`${this.URL_API}/v1/public/comics`, { params: { apikey: this.PUBLIC_KEY, offset: pageNumber, limit: 40, characters: characterId } })
      .pipe(
      map(response => {
        return this.helper.mapComicsResponse(response);
      })
      )
  }

  getCharactersByFullName(characterName: string, pageNumber?: number): Observable<GetCharactersInformation> {
    return this.http.get<any>(`${this.URL_API}/v1/public/characters`, { params: { apikey: this.PUBLIC_KEY, offset: pageNumber, limit: 40, name: characterName } })
      .pipe(
      map(response => {
        return this.helper.mapCharactersResponse(response);
      })
      )
  }


  getCharactersByNameStartsWithWord(word: string, pageNumber?: number): Observable<GetCharactersInformation> {
    return this.http.get<any>(`${this.URL_API}/v1/public/characters`, { params: { apikey: this.PUBLIC_KEY, offset: pageNumber, limit: 40, nameStartsWith: word } })
      .pipe(
      map(response => {
        return this.helper.mapCharactersResponse(response);
      })
      )
  }
}

