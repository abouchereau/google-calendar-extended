import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Repas } from './repas';

describe('Repas', () => {
  let component: Repas;
  let fixture: ComponentFixture<Repas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Repas],
    }).compileComponents();

    fixture = TestBed.createComponent(Repas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
