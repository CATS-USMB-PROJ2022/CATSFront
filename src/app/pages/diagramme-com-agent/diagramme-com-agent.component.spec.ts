import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagrammeComAgentComponent } from './diagramme-com-agent.component';

describe('DiagrammeComAgentComponent', () => {
  let component: DiagrammeComAgentComponent;
  let fixture: ComponentFixture<DiagrammeComAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagrammeComAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagrammeComAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
