import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HelpersService } from 'src/app/shared/services/helpers/helpers.service';
import { GetComicsInformation } from 'src/app/Models/GetComicsInformation.model';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpTestingController: HttpTestingController;
  const PUBLIC_KEY = '33313dc7eaeacdd085b4da8a0bd9e0f7';
  const URL_API = 'https://gateway.marvel.com:443';
  let mapHelperStub:{
    mapComicsResponse: ()=>{},
    mapComicDetailsResponse: ()=>{},
    mapCharactersResponse: ()=>{}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiServiceService, HttpClient, {provide: HelpersService,useValue:mapHelperStub}]
    });
    service = TestBed.get(ApiServiceService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all comics on GET api request', fakeAsync(() => {
    const pageNumber = '1';
    const url = `${URL_API}/v1/public/comics?apikey=${PUBLIC_KEY}&offset=${pageNumber}&limit=10`;    
    service.getComics(pageNumber).subscribe((data) => { });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    tick();

  }));

  it('should return all comics that matches an id', fakeAsync(() => {
    const id = 1;
    const url = `${URL_API}/v1/public/comics/${id}?apikey=${PUBLIC_KEY}`;    
    service.getComicById(id).subscribe((data) => { });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    tick();
  }));

  it('should return all comics from specific characterId', fakeAsync(() => {
    const id = '1';
    const pageNumber = '1';
    const url = `${URL_API}/v1/public/comics?apikey=${PUBLIC_KEY}&offset=${pageNumber}&limit=10&characters=${id}`; 
    service.getComicsByCharacterId(id,pageNumber).subscribe((data) => { });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    tick();

  }));

  it('should return all characters that match beggining of name', fakeAsync(() => {
    const word = 'spider';
    const pageNumber = '1';
    const url = `${URL_API}/v1/public/characters?apikey=${PUBLIC_KEY}&offset=${pageNumber}&limit=10&nameStartsWith=${word}`; 
    service.getCharactersByNameStartsWithWord(word,pageNumber).subscribe((data) => { });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    tick();

  }));


});
