import { Injectable } from '@angular/core';
import { GetComicsInformation } from 'src/app/Models/GetComicsInformation.model';
import { Comic } from 'src/app/Models/Comic.model';
import { GetCharactersInformation } from 'src/app/Models/GetCharactersInformation.model';
import { Character } from 'src/app/Models/Character.model';
import { ComicDetails } from 'src/app/Models/ComicDetails.model';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  mapComicsResponse(response) {
    let comicInformation = new GetComicsInformation();
    comicInformation.offset = response.data.offset;
    comicInformation.limit = response.data.limit;
    comicInformation.total = response.data.total;
    comicInformation.count = response.data.count;
    comicInformation.comics = response.data.results.map(comicItem => {
      let comic = new Comic();
      comic.id = comicItem.id;
      comic.title = comicItem.title;
      comic.thumbnail = comicItem.thumbnail.path + '.' + comicItem.thumbnail.extension;
      return comic;
    })
    return comicInformation;
  }

  mapComicDetailsResponse(response){    
    return response.data.results.map(comicItem => {
     let comicDetails = new ComicDetails();   
       comicDetails.id = comicItem.id;
       comicDetails.title = comicItem.title;
       comicDetails.thumbnail = comicItem.thumbnail.path + '.' + comicItem.thumbnail.extension;
       comicDetails.images = comicItem.images.map(comicItemImage => { return comicItemImage.path + '.' + comicItemImage.extension });
       comicDetails.authors = comicItem.creators.items.map(comicItemAuthor => { return comicItemAuthor.name });
       return comicDetails;
     })
   }

  mapCharactersResponse(response){
    let characterInformation = new GetCharactersInformation();
    characterInformation.offset = response.data.offset;
    characterInformation.limit = response.data.limit;
    characterInformation.total = response.data.total;
    characterInformation.count = response.data.count;
    characterInformation.characters = response.data.results.map(characterItem => {
      let character = new Character();
      character.id = characterItem.id;
      character.name = characterItem.name;
      character.thumbnail = characterItem.thumbnail.path + '.' + characterItem.thumbnail.extension;
      character.description = characterItem.description;
      character.comicsAmount = characterItem.comics.available
      return character;
    })
    return characterInformation;
  }

  

}
