import {ComponentFixture, TestBed} from '@angular/core/testing';
import { OverlayUploadComponent } from './overlay-upload.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('OverlayUploadComponent', () => {
  let component: OverlayUploadComponent;
  let fixture: ComponentFixture<OverlayUploadComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
      ],
      declarations: [
        OverlayUploadComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
