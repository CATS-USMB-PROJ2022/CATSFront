import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeDissuasionAppelComponent } from './diagramme-dissuasion-appel.component';

describe('StatusCallDiagramComponent', () => {
  let component: DiagrammeDissuasionAppelComponent;
  let fixture: ComponentFixture<DiagrammeDissuasionAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeDissuasionAppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeDissuasionAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
