import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndCallDiagramComponent } from './end-call-diagram.component';

describe('EndCallDiagramComponent', () => {
  let component: EndCallDiagramComponent;
  let fixture: ComponentFixture<EndCallDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndCallDiagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndCallDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
