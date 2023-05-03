import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagrammeComAgentComponent} from './diagramme-com-agent.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DiagrammeComAgentComponent', () => {
  let component: DiagrammeComAgentComponent;
  let fixture: ComponentFixture<DiagrammeComAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagrammeComAgentComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeComAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
