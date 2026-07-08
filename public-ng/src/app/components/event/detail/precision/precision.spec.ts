import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Precision } from './precision';

describe('Precision', () => {
  let component: Precision;
  let fixture: ComponentFixture<Precision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Precision],
    }).compileComponents();

    fixture = TestBed.createComponent(Precision);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
