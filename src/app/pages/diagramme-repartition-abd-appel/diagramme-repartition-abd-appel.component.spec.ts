import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeRepartitionAbdAppelComponent } from './diagramme-repartition-abd-appel.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DiagrammeRepartitionAbdAppelComponent', () => {
  let component: DiagrammeRepartitionAbdAppelComponent;
  let fixture: ComponentFixture<DiagrammeRepartitionAbdAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeRepartitionAbdAppelComponent ],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeRepartitionAbdAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
