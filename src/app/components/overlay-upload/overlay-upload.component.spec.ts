import { TestBed } from '@angular/core/testing';
import { OverlayUploadComponent } from './overlay-upload.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('OverlayUploadComponent', () => {
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
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(OverlayUploadComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
