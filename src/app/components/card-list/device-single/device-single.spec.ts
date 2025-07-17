import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSingleComponent } from './device-single';

describe('Device', () => {
  let component: DeviceSingleComponent;
  let fixture: ComponentFixture<DeviceSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceSingleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeviceSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
