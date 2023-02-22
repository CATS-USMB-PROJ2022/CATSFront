import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeStatutAppelComponent } from './diagramme-statut-appel.component';

describe('StatusCallDiagramComponent', () => {
  let component: DiagrammeStatutAppelComponent;
  let fixture: ComponentFixture<DiagrammeStatutAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeStatutAppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeStatutAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
