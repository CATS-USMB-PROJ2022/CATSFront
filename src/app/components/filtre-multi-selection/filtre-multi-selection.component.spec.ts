import {ComponentFixture, TestBed} from '@angular/core/testing';
import { FiltreMultiSelectionComponent} from "./filtre-multi-selection.component";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('FiltreMultiSelectionComponent', () => {
  let component: FiltreMultiSelectionComponent;
  let fixture: ComponentFixture<FiltreMultiSelectionComponent>;
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

    fixture = TestBed.createComponent(FiltreMultiSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
