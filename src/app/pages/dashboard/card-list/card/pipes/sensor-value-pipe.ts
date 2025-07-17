import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sensorValue'
})
export class SensorValuePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(amount: number, unit: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `${amount} <span style="color: #888;">${unit}</span>`
    );
  }
}
