import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCheminementAppelComponent } from './graph-cheminement-appel.component';

describe('GraphCheminementAppelComponent', () => {
  let component: GraphCheminementAppelComponent;
  let fixture: ComponentFixture<GraphCheminementAppelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphCheminementAppelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphCheminementAppelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
