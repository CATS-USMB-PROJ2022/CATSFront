import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotFoundComponent} from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should have a title', () => {
    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toEqual('Erreur 404');
  });

  it ('should have a message', () => {
    const message = fixture.nativeElement.querySelector('span');
    expect(message.textContent).toEqual('La page que vous demandez n\'existe pas.');
  });

  it ('should have a link to the home page', () => {
    const link = fixture.nativeElement.querySelector('button');
    expect(link.getAttribute('routerLink')).toEqual("");
  });
});
