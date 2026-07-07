import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFiltres } from './modal-filtres';

describe('ModalFiltres', () => {
  let component: ModalFiltres;
  let fixture: ComponentFixture<ModalFiltres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFiltres],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFiltres);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
