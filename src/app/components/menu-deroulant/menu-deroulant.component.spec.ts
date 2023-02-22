import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeroulantComponent } from './menu-deroulant.component';

describe('DropdownComponent', () => {
  let component: MenuDeroulantComponent;
  let fixture: ComponentFixture<MenuDeroulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDeroulantComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuDeroulantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
