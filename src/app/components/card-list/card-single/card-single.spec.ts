import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSingleComponent } from './card-single';

describe('Device', () => {
  let component: CardSingleComponent;
  let fixture: ComponentFixture<CardSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSingleComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
