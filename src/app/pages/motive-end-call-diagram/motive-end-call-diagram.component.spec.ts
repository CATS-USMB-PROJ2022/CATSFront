import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotiveEndCallDiagramComponent } from './motive-end-call-diagram.component';

describe('StatusCallDiagramComponent', () => {
  let component: MotiveEndCallDiagramComponent;
  let fixture: ComponentFixture<MotiveEndCallDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotiveEndCallDiagramComponent ]
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
