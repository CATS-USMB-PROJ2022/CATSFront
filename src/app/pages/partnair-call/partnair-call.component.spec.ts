import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnairCallComponent } from './partnair-call.component';

describe('PartnairCallComponent', () => {
  let component: PartnairCallComponent;
  let fixture: ComponentFixture<PartnairCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnairCallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnairCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
