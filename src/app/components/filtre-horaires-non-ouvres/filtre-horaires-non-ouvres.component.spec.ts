import { TestBed } from '@angular/core/testing';
import { FiltreHorairesNonOuvresComponent} from "./filtre-horaires-non-ouvres.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('FiltreHorairesNonOuvresComponent', () => {
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
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FiltreHorairesNonOuvresComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
