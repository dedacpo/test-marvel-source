import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { ApiServiceService } from 'src/app/shared/services/api-service/api-service.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ComicDetails } from 'src/app/Models/ComicDetails.model';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let apiService: ApiServiceService;


  let apiServiceStub = {
    getComicById: () => (of())
  }

  let activatedRouteStub = {
    snapshot: {
      params:{
        id:'500'
      }
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      providers:[
        {provide: ApiServiceService, useValue:apiServiceStub},
        {provide: ActivatedRoute, useValue:activatedRouteStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    apiService  = fixture.debugElement.injector.get(ApiServiceService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set details with response API', () => {
    const data:ComicDetails[] =[
      {
        id: 500,
        title: 'comic name test',
        description: 'description for test',
        thumbnail: 'img.png',
        format:'',
        images: ['img1.png'],
        authors:['author 1', 'author2']
      }
    ]
    const spy = spyOn(apiService, 'getComicById').and.returnValue(of(data));
    component.ngOnInit();
    expect(component.details).toEqual(data[0]);
  });
});
