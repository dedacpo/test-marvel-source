import { TestBed } from '@angular/core/testing';

import { HelpersService } from './helpers.service';
import { GetComicsInformation } from 'src/app/Models/GetComicsInformation.model';
import { Comic } from 'src/app/Models/Comic.model';
import { ComicDetails } from 'src/app/Models/ComicDetails.model';
import { GetCharactersInformation } from 'src/app/Models/GetCharactersInformation.model';
import { Character } from 'src/app/Models/Character.model';

describe('HelpersService', () => {
  let service: HelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpersService);
  });

  it('should successfully convert object to GetComicsInformation', () => {
    let response = {
      data: {
        offset: 1,
        limit: 200,
        total: 500,
        count: 40000,
        results: [
          {
            id: 500,
            title: 'a comic title',
            thumbnail: {
              path: 'path',
              extension: 'jpg'
            }
          }
        ]
      }

    };
    let result = service.mapComicsResponse(response);  
   
    let expectVar= new GetComicsInformation();
    expectVar.offset = response.data.offset;
    expectVar.limit = response.data.limit;
    expectVar.total= response.data.total;
    expectVar.count= response.data.count; 
    let comic = new Comic();
    comic.id = response.data.results[0].id;
    comic.title = response.data.results[0].title;
    comic.thumbnail = response.data.results[0].thumbnail.path + '.' +response.data.results[0].thumbnail.extension;
    expectVar.comics = [comic];
    expect(result).toEqual(expectVar);
  });

  it('should successfully convert object to ComicDetails', () => {
    let response = {
      data: {
        results:[
          {
            id: 500,
            title: 'comic name test',
            description: 'description for test',
            thumbnail: {
              path: 'path',
              extension: 'jpg'
            },
            images: [
              {
                path: 'path',
                extension: 'jpg'
              }
            ],
            creators:
              {
                items:
                  [
                    {
                      name: 'name author'
                    }
                  ]
              }
          }
        ]
      }
    };
    let result = service.mapComicDetailsResponse(response);  
   
    let expectVar= new ComicDetails();
    expectVar.id = response.data.results[0].id;
    expectVar.title = response.data.results[0].title;
    expectVar.description = response.data.results[0].description
    expectVar.thumbnail= response.data.results[0].thumbnail.path + '.' + response.data.results[0].thumbnail.extension;;
    expectVar.images= [
      response.data.results[0].images[0].path + '.' + response.data.results[0].images[0].extension
    ];
    expectVar.authors = [
      response.data.results[0].creators.items[0].name
    ]    
    expect(result).toEqual([expectVar]);
  });

  
  it('should successfully convert object to GetCharactersInformation', () => {
    let response = {
      data: {
        offset: 1,
        limit: 200,
        total: 500,
        count: 40000,
        results: [
          {
            id: 500,
            name: 'spider-man',
            thumbnail: {
              path: 'path',
              extension: 'jpg'
            },
            description:'this is a description',
            comics:{
              available:45
            }            
          }
        ]
      }

    };
    let result = service.mapCharactersResponse(response);  
   
    let expectVar= new GetCharactersInformation();
    expectVar.offset = response.data.offset;
    expectVar.limit = response.data.limit;
    expectVar.total= response.data.total;
    expectVar.count= response.data.count;   
    let comic = new Character();
    comic.id = response.data.results[0].id;
    comic.name = response.data.results[0].name;
    comic.thumbnail = response.data.results[0].thumbnail.path + '.' +response.data.results[0].thumbnail.extension;
    comic.description = response.data.results[0].description;
    comic.comicsAmount = response.data.results[0].comics.available; 
    expectVar.characters = [comic];
    expect(result).toEqual(expectVar);
  });

});
