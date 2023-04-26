import { TestBed } from '@angular/core/testing';
import { FiltreMultiSelectionComponent} from "./filtre-multi-selection.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('FiltreMultiSelectionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [
        FiltreMultiSelectionComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FiltreMultiSelectionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
