import { TestBed } from '@angular/core/testing';
import { CssVarService } from './css-var';

describe('CssVar', () => {
  let service: CssVarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CssVarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
