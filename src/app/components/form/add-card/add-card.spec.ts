import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardCard } from './add-card';

describe('AddDashboardCard', () => {
  let component: AddDashboardCard;
  let fixture: ComponentFixture<AddDashboardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardCard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddDashboardCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
