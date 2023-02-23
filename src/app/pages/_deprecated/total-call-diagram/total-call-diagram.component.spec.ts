import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCallDiagramComponent } from './total-call-diagram.component';

describe('TotalCallDiagramComponent', () => {
  let component: TotalCallDiagramComponent;
  let fixture: ComponentFixture<TotalCallDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCallDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalCallDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
