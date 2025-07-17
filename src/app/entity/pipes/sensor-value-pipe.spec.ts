import { SensorValuePipe } from './sensor-value-pipe';
import { SafeHtml } from '@angular/platform-browser';

class MockDomSanitizer {
  bypassSecurityTrustHtml(value: string): SafeHtml {
    return value as SafeHtml;
  }
}

describe('SensorValuePipe', () => {
  let pipe: SensorValuePipe;

  beforeEach(() => {
    const sanitizer = new MockDomSanitizer();
    pipe = new SensorValuePipe(sanitizer as any);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format singular unit correctly', () => {
    const result = pipe.transform(1, 'unit');
    expect(result).toBe('unit');
  });

  it('should format plural value and unit correctly', () => {
    const result = pipe.transform(5, 'unit');
    expect(result).toBe('5 <span style="color: #888;">unit</span>');
  });
});
