import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCharacterComponent } from './search-character.component';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { GetCharactersInformation } from 'src/app/Models/GetCharactersInformation.model';

describe('SearchCharacterComponent', () => {
  let component: SearchCharacterComponent;
  let fixture: ComponentFixture<SearchCharacterComponent>;
  let apiService: ApiServiceService;
  let router: Router;

  let apiServiceStub = {
    getCharactersByNameStartsWithWord: () => (of())    
  }

  let activatedRouteStub = {
    snapshot: {
      params:{
        wordSearch:'spider',
      }
    }
  }

  let routerStub = {
    navigate:  jasmine.createSpy('navigate'),
    url:''
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCharacterComponent ],
      imports:[RouterTestingModule],
      providers:[
        FormBuilder, 
        {provide: Router, useValue:routerStub},
        {provide: ApiServiceService, useValue:apiServiceStub},
        {provide: ActivatedRoute, useValue:activatedRouteStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCharacterComponent);
    component = fixture.componentInstance;
    apiService  = fixture.debugElement.injector.get(ApiServiceService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set notFound to true', () => {
    const router = TestBed.get(Router);
    router.url = '';
    const data:GetCharactersInformation = {
      offset: 0,
      limit: 10,
      total: 0,
      count: 0,
      characters: []
    }
    const spy = spyOn(apiService, 'getCharactersByNameStartsWithWord').and.returnValue(of(data));
    component.getData('');
    expect(component.notFound).toBeTruthy();
  });

  it('should successfuly set characters, currentPage, pagination and TotalPages', () => {
    const router = TestBed.get(Router);
    router.url = '';
    const data:GetCharactersInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      characters: [
        {
          id: 500,
          name: 'a comic title',
          thumbnail: "thumbnail.jpg",
          description: "description",
          comicsAmount:500
        }
      ]
    }
    const spy = spyOn(apiService, 'getCharactersByNameStartsWithWord').and.returnValue(of(data));
    component.getData('');
    expect(component.characters).toEqual(data);
    expect(component.currentPage).toEqual(data.offset/data.limit);
    expect(component.totalPages).toEqual( Math.ceil(data.total / data.limit));
  });

  it('should navigate to search-character with the wordSearch when performSearch is called', ()=>{
    component.searchCharacter.controls.wordSearch.setValue('spider');
    component.performSearch();
    expect (routerStub.navigate).toHaveBeenCalledWith(['/search-character','spider']);
  })

  it('should call getData with pageNumber provided', ()=>{
    const data:GetCharactersInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      characters: [
        {
          id: 500,
          name: 'a comic title',
          thumbnail: "thumbnail.jpg",
          description: "description",
          comicsAmount:500
        }
      ]
    }    
    component.characters = data;
    component.pagination.controls.pageNumber.setValue(2);
    const spy = spyOn(component,'getData');
    component.changePage();    
    expect (spy).toHaveBeenCalledWith(10);
  })

  it('should call getData with nextPage provided', ()=>{
    const data:GetCharactersInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      characters: [
        {
          id: 500,
          name: 'a comic title',
          thumbnail: "thumbnail.jpg",
          description: "description",
          comicsAmount:500
        }
      ]
    }    
    component.characters = data;
    component.pagination.controls.pageNumber.setValue(2);
    const spy = spyOn(component,'getData');
    component.nextPage();    
    expect (spy).toHaveBeenCalledWith(20);
  })

  it('should call getData with nextPage provided', ()=>{
    const data:GetCharactersInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      characters: [
        {
          id: 500,
          name: 'a comic title',
          thumbnail: "thumbnail.jpg",
          description: "description",
          comicsAmount:500
        }
      ]
    }    
    component.characters = data;
    component.pagination.controls.pageNumber.setValue(2);
    const spy = spyOn(component,'getData');
    component.prevPage();    
    expect (spy).toHaveBeenCalledWith(0);
  })

  it('should return data URI encoded', ()=>{
      const data = component.fnEncodeURI('captain america');
      expect(data).toEqual(encodeURI('captain america'))
  })

});
