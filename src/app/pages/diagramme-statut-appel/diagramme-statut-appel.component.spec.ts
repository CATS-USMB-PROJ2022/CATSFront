import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DiagrammeStatutAppelComponent} from './diagramme-statut-appel.component';

describe('StatusCallDiagramComponent', () => {
  let component: DiagrammeStatutAppelComponent;
  let fixture: ComponentFixture<DiagrammeStatutAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagrammeStatutAppelComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeStatutAppelComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
