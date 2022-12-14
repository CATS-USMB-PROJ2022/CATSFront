import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {CallService} from "../../service/call.service";
import {of} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let callService: CallService;

  beforeEach(async () => {
    callService = jasmine.createSpyObj(CallService, {
      postNumberCall: of('http://localhost:8080/Home'),
    });
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{ provide: CallService, useValue: callService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(callService.postNumberCall).toHaveBeenCalled();
  });
});
