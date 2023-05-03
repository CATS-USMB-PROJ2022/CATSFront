import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DiagrammeDissuasionAppelComponent} from './diagramme-dissuasion-appel.component';

describe('StatusCallDiagramComponent', () => {
  let component: DiagrammeDissuasionAppelComponent;
  let fixture: ComponentFixture<DiagrammeDissuasionAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [DiagrammeDissuasionAppelComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeDissuasionAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
