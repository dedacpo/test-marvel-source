import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListCatalogComponent } from './list-catalog.component';
import { FormBuilder } from '@angular/forms';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GetComicsInformation } from 'src/app/Models/GetComicsInformation.model';

describe('ListCatalogComponent', () => {
  let component: ListCatalogComponent;
  let fixture: ComponentFixture<ListCatalogComponent>;
  let apiService: ApiServiceService;
  let router: Router;


  let apiServiceStub = {
    getComics: () => (of()),
    getComicsByCharacterId: () => (of())
  }

  let activatedRouteStub = {
    snapshot: {
      params:{
        name:'test',
        id:'test'
      }
    }
  }

  let routerStub = {
    navigate:  jasmine.createSpy('navigate'),
    url:''
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCatalogComponent ],
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
    fixture = TestBed.createComponent(ListCatalogComponent);
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
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 0,
      count: 0,
      comics: []
    }
    const spy = spyOn(apiService, 'getComics').and.returnValue(of(data));
    component.getData('');
    expect(component.notFound).toBeTruthy();
  });

  it('should successfuly set comics, currentPage, pagination and TotalPages', () => {
    const router = TestBed.get(Router);
    router.url = '';
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      comics: [
        {
          id: 500,
          title: 'a comic title',
          thumbnail: "thumbnail.jpg"
        }
      ]
    }
    const spy = spyOn(apiService, 'getComics').and.returnValue(of(data));
    component.getData('');
    expect(component.comics).toEqual(data);
    expect(component.currentPage).toEqual(data.offset/data.limit);
    expect(component.totalPages).toEqual( Math.ceil(data.total / data.limit));
  });
  
  it('should set notFound to true  when router is comics-character', () => {
    const router = TestBed.get(Router);
    router.url = '/comics-character';
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 0,
      count: 0,
      comics: []
    }
    const spy = spyOn(apiService, 'getComicsByCharacterId').and.returnValue(of(data));
    component.getData('');
    expect(component.notFound).toBeTruthy();
  });

  it('should successfuly set comics, currentPage, pagination and TotalPages when router is comics-character', () => {
    const router = TestBed.get(Router);
    router.url = '/comics-character';
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      comics: [
        {
          id: 500,
          title: 'a comic title',
          thumbnail: "thumbnail.jpg"
        }
      ]
    }
    const spy = spyOn(apiService, 'getComicsByCharacterId').and.returnValue(of(data));
    component.getData('');
    expect(component.comics).toEqual(data);
    expect(component.currentPage).toEqual(data.offset/data.limit);
    expect(component.totalPages).toEqual( Math.ceil(data.total / data.limit));
  });

  it('should navigate to search-character with the wordSearch when performSearch is called', ()=>{
    component.searchCharacter.controls.wordSearch.setValue('spider');
    component.performSearch();
    expect (routerStub.navigate).toHaveBeenCalledWith(['/search-character','spider']);
  })

  it('should call getData with pageNumber provided', ()=>{
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      comics: [
        {
          id: 500,
          title: 'a comic title',
          thumbnail: "thumbnail.jpg"
        }
      ]
    }    
    component.comics = data;
    component.pagination.controls.pageNumber.setValue(2);
    const spy = spyOn(component,'getData');
    component.changePage();    
    expect (spy).toHaveBeenCalledWith(10);
  })

  it('should call getData with nextPage provided', ()=>{
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      comics: [
        {
          id: 500,
          title: 'a comic title',
          thumbnail: "thumbnail.jpg"
        }
      ]
    }    
    component.comics = data;
    component.pagination.controls.pageNumber.setValue(2);
    const spy = spyOn(component,'getData');
    component.nextPage();    
    expect (spy).toHaveBeenCalledWith(20);
  })

  it('should call getData with nextPage provided', ()=>{
    const data:GetComicsInformation = {
      offset: 0,
      limit: 10,
      total: 20,
      count: 10,
      comics: [
        {
          id: 500,
          title: 'a comic title',
          thumbnail: "thumbnail.jpg"
        }
      ]
    }    
    component.comics = data;
    component.pagination.controls.pageNumber.setValue(2);
    const spy = spyOn(component,'getData');
    component.prevPage();    
    expect (spy).toHaveBeenCalledWith(0);
  })
});
