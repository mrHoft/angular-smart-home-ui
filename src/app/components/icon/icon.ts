import { Component } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  template: '<ng-content/>',
  styles: /* css */`
  :host{
    display: inline-block;
    font-size: 1.5em;
    line-height: 1;
    font-family: "Material Icons";
    width: 24px;
    height: 24px;
  }`
})
export class Icon { }
