import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardTab } from './add-tab';

describe('AddDashboardTab', () => {
  let component: AddDashboardTab;
  let fixture: ComponentFixture<AddDashboardTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardTab]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddDashboardTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
