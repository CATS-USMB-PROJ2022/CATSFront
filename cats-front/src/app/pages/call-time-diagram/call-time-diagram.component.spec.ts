import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallTimeDiagramComponent } from './call-time-diagram.component';

describe('CallTimeDiagramComponent', () => {
  let component: CallTimeDiagramComponent;
  let fixture: ComponentFixture<CallTimeDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallTimeDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallTimeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
