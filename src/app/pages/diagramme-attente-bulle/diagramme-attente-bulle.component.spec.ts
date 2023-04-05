import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeAttenteBulleComponent } from './diagramme-attente-bulle.component';

describe('DiagrammeAttenteBulleComponent', () => {
  let component: DiagrammeAttenteBulleComponent;
  let fixture: ComponentFixture<DiagrammeAttenteBulleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeAttenteBulleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeAttenteBulleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
