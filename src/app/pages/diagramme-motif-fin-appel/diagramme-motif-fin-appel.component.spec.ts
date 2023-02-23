import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeMotifFinAppelComponent } from './diagramme-motif-fin-appel.component';

describe('MotiveEndCallDiagramComponent', () => {
  let component: DiagrammeMotifFinAppelComponent;
  let fixture: ComponentFixture<DiagrammeMotifFinAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeMotifFinAppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeMotifFinAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
