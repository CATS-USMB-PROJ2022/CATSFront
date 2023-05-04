import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CarteIndicateurComponent} from './carte-indicateur.component';

describe('CarteIndicateurComponent', () => {
  let component: CarteIndicateurComponent;
  let fixture: ComponentFixture<CarteIndicateurComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CarteIndicateurComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.titre = 'Test titre';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Test titre');
  });


});
