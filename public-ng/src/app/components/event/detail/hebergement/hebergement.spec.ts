import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hebergement } from './hebergement';

describe('Hebergement', () => {
  let component: Hebergement;
  let fixture: ComponentFixture<Hebergement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hebergement],
    }).compileComponents();

    fixture = TestBed.createComponent(Hebergement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
