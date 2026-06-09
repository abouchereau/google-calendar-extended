import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInstall } from './modal-install';

describe('ModalInstall', () => {
  let component: ModalInstall;
  let fixture: ComponentFixture<ModalInstall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInstall],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInstall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
