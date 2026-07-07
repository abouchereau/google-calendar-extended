import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPersonList } from './admin-person-list';

describe('AdminPersonList', () => {
  let component: AdminPersonList;
  let fixture: ComponentFixture<AdminPersonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPersonList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPersonList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
