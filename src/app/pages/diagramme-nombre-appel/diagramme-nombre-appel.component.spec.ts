import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeNombreAppelComponent } from './diagramme-nombre-appel.component';

describe('DiagrammeNombreAppelComponent', () => {
  let component: DiagrammeNombreAppelComponent;
  let fixture: ComponentFixture<DiagrammeNombreAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeNombreAppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeNombreAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
