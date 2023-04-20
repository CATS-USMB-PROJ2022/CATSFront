import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeRepartitionAbdAppelComponent } from './diagramme-repartition-abd-appel.component';

describe('DiagrammeRepartitionAbdAppelComponent', () => {
  let component: DiagrammeRepartitionAbdAppelComponent;
  let fixture: ComponentFixture<DiagrammeRepartitionAbdAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeRepartitionAbdAppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeRepartitionAbdAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
