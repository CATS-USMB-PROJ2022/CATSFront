import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownComponent } from './dropdown.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ DropdownComponent ],
        providers: [
            HttpClient,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
            HttpHandler,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
