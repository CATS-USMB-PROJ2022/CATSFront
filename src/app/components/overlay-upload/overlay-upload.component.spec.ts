import {ComponentFixture, TestBed} from '@angular/core/testing';
import {OverlayUploadComponent} from './overlay-upload.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {PostService} from "../../service/post.service";
import spyOn = jest.spyOn;

describe('OverlayUploadComponent', () => {
  let component: OverlayUploadComponent;
  let fixture: ComponentFixture<OverlayUploadComponent>;
  let postService: PostService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        PostService
      ],
      declarations: [
        OverlayUploadComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    postService = TestBed.inject(PostService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a method getFileName', () => {
    expect(component.getFileName).toBeTruthy();
    spyOn(component, 'getFileName');
    component.getFileName();
    expect(component.getFileName).toHaveBeenCalled();
  });

  it('should have a method ouvrirOverlay', () => {
    expect(component.ouvrirOverlay).toBeTruthy();
    spyOn(component, 'ouvrirOverlay');
    component.ouvrirOverlay();
    expect(component.ouvrirOverlay).toHaveBeenCalled();
    expect(component.is_overlay_ouvert).toBe(true);
  });

  it('should have a method fermerOverlay', () => {
    expect(component.fermerOverlay).toBeTruthy();
    spyOn(component, 'fermerOverlay');
    component.fermerOverlay();
    expect(component.fermerOverlay).toHaveBeenCalled();
    expect(component.is_overlay_ouvert).toBe(false);
  });

  it('should have a method upload', () => {
    spyOn(postService, 'postUploadFichiers');
    expect(component.upload).toBeTruthy();
    spyOn(component, 'upload');
    component.fichiers = [new File([''], 'test.txt')];
    component.upload();
    expect(component.upload).toHaveBeenCalled();
    expect(postService.postUploadFichiers).toHaveBeenCalled();
  });
});
