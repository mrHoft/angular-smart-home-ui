import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareButton } from './square-button';

describe('SquareButton', () => {
  let component: SquareButton;
  let fixture: ComponentFixture<SquareButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquareButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
