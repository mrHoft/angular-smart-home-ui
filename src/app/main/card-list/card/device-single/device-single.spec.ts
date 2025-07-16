import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSingle } from './device-single';

describe('Device', () => {
  let component: DeviceSingle;
  let fixture: ComponentFixture<DeviceSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceSingle]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeviceSingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
