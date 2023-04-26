import { TestBed } from '@angular/core/testing';
import {FiltreDateHeureComponent} from "./filtre-date-heure.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('FiltreDateHeureComponent', () => {
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
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FiltreDateHeureComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
