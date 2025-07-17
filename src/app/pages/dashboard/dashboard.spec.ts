import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDashboard } from './dashboard';

describe('Main', () => {
  let component: PageDashboard;
  let fixture: ComponentFixture<PageDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDashboard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
