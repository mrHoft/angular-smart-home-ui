import { TestBed } from '@angular/core/testing';

import { CssVar } from './css-var';

describe('CssVar', () => {
  let service: CssVar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CssVar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
