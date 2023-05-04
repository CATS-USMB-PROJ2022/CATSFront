import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagrammeAttenteBulleComponent} from './diagramme-attente-bulle.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import spyOn = jest.spyOn;
import {PostService} from "../../service/post.service";
import {of} from "rxjs";

describe('DiagrammeAttenteBulleComponent', () => {
  let component: DiagrammeAttenteBulleComponent;
  let fixture: ComponentFixture<DiagrammeAttenteBulleComponent>;
  let postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagrammeAttenteBulleComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        PostService,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeAttenteBulleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    postService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the data correctly', () => {
    spyOn(postService,'postAttenteRepartitionAppel').mockReturnValue(
      of({labels: ['label1', 'label2'],
        values: [[1, 2], [3, 4]],
        attenteMoyenneAvantAbandon: 5,
        appelsDebordesAbandonnes: 6,})
    );
    spyOn(component, 'getData');
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
    expect(component.labels).toEqual(['label1', 'label2']);
    expect(component.AttenteRepartition).toEqual([[1, 2], [3, 4]]);
    expect(component.attenteMoyenneAvantAbandon).toEqual(5);
    expect(component.appelsDebordesAbandonnes).toEqual(6);
  });
});
