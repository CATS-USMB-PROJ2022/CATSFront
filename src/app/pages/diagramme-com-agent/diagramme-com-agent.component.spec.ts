import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DiagrammeComAgentComponent} from './diagramme-com-agent.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {PostService} from "../../service/post.service";
import {of} from "rxjs";
import spyOn = jest.spyOn;

describe('DiagrammeComAgentComponent', () => {
  let component: DiagrammeComAgentComponent;
  let fixture: ComponentFixture<DiagrammeComAgentComponent>;
  let postService: PostService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagrammeComAgentComponent],
      providers: [
        HttpClient,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        HttpHandler,
        {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        PostService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DiagrammeComAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    postService = TestBed.inject(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should update the data correctly', () => {
    spyOn(postService, 'postComAgent').mockReturnValueOnce(of({
      data: [
        {
          agent: 'agent1',
          label: 'label1',
          nbr: 1
        },
        {
          agent: 'agent2',
          label: 'label2',
          nbr: 2
        }
      ]
    }));
    spyOn(component, 'getData');
    component.ngOnInit();
    expect(component.getData).toHaveBeenCalled();
  });
});
