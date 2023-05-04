import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FiltreHorairesNonOuvresComponent} from "./filtre-horaires-non-ouvres.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('FiltreHorairesNonOuvresComponent', () => {
  let component: FiltreHorairesNonOuvresComponent;
  let fixture: ComponentFixture<FiltreHorairesNonOuvresComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [
        FiltreHorairesNonOuvresComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltreHorairesNonOuvresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
