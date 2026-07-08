import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPwa } from './modal-pwa';

describe('ModalPwa', () => {
  let component: ModalPwa;
  let fixture: ComponentFixture<ModalPwa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPwa],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPwa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
