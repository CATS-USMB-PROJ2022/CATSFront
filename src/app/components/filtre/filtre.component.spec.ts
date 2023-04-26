import { TestBed } from '@angular/core/testing';
import {FiltreComponent} from "./filtre.component";

describe('FiltreComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FiltreComponent
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(FiltreComponent);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
