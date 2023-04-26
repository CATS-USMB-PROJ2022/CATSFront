import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FiltreDateHeureComponent} from "./filtre-date-heure.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('FiltreDateHeureComponent', () => {
  let component: FiltreDateHeureComponent;
  let fixture: ComponentFixture<FiltreDateHeureComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [
        FiltreDateHeureComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltreDateHeureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
