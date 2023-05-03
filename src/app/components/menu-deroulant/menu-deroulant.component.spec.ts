import {ComponentFixture, TestBed} from '@angular/core/testing';


import {HttpClient, HttpHandler} from "@angular/common/http";
import {MenuDeroulantComponent} from './menu-deroulant.component';

describe('DropdownComponent', () => {
  let component: MenuDeroulantComponent;
  let fixture: ComponentFixture<MenuDeroulantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [MenuDeroulantComponent]
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
