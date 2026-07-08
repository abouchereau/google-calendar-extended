import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFooter } from './panel-footer';

describe('PanelFooter', () => {
  let component: PanelFooter;
  let fixture: ComponentFixture<PanelFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
