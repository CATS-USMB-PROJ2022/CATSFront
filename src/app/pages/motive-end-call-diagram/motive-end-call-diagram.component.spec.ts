import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotiveEndCallDiagramComponent } from './motive-end-call-diagram.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MotiveEndCallDiagramComponent', () => {
  let component: MotiveEndCallDiagramComponent;
  let fixture: ComponentFixture<MotiveEndCallDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotiveEndCallDiagramComponent ],
        providers: [
            HttpClient,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
            HttpHandler,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotiveEndCallDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
