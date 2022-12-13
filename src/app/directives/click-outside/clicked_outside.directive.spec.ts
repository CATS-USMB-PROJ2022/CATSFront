import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickOutsideDirective } from './clicked_outside.directive';

describe('ClickOutsideDirective', () => {
  let component: ClickOutsideDirective;
  let fixture: ComponentFixture<ClickOutsideDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClickOutsideDirective ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClickOutsideDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
