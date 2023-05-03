import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DiagrammeMotifFinAppelComponent} from './diagramme-motif-fin-appel.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MotiveEndCallDiagramComponent', () => {
  let component: DiagrammeMotifFinAppelComponent;
  let fixture: ComponentFixture<DiagrammeMotifFinAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagrammeMotifFinAppelComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeMotifFinAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
