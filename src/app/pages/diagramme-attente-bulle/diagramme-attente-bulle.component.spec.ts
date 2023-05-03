import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagrammeAttenteBulleComponent} from './diagramme-attente-bulle.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DiagrammeAttenteBulleComponent', () => {
  let component: DiagrammeAttenteBulleComponent;
  let fixture: ComponentFixture<DiagrammeAttenteBulleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagrammeAttenteBulleComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeAttenteBulleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
