import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeNombreAppelComponent } from './diagramme-nombre-appel.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DiagrammeNombreAppelComponent', () => {
  let component: DiagrammeNombreAppelComponent;
  let fixture: ComponentFixture<DiagrammeNombreAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeNombreAppelComponent ],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeNombreAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
