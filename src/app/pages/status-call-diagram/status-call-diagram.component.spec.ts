import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCallDiagramComponent } from './status-call-diagram.component';
describe('StatusCallDiagramComponent', () => {
  let component: StatusCallDiagramComponent;
  let fixture: ComponentFixture<StatusCallDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCallDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusCallDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
