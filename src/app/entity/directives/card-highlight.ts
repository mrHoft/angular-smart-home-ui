import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appCardHighlight]'
})
export class CardHighlight {
  highlight = input<boolean>(true);

  @HostBinding('style.color')
  get color() {
    return this.highlight() ? '#ee0' : '#888';
  }
}
