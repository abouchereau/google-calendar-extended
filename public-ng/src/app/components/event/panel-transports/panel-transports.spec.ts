import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTransports } from './panel-transports';

describe('PanelTransports', () => {
  let component: PanelTransports;
  let fixture: ComponentFixture<PanelTransports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelTransports],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelTransports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
