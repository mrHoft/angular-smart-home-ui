import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appLampHighlight]',
  standalone: true
})
export class LampHighlight {
  highlight = input<boolean>(true);

  @HostBinding('style.color')
  get color() {
    return this.highlight() ? '#ee0' : '#888';
  }
}
