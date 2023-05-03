import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCheminementAppelComponent } from './graph-cheminement-appel.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('GraphCheminementAppelComponent', () => {
  let component: GraphCheminementAppelComponent;
  let fixture: ComponentFixture<GraphCheminementAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphCheminementAppelComponent ],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphCheminementAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
