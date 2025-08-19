import { Component, TemplateRef, input, ContentChild } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: ''
})
export class TabComponent {
  readonly id = input.required<string>();
  readonly disabled = input(false);

  @ContentChild('header', { read: TemplateRef }) headerTemplate!: TemplateRef<any>;
  @ContentChild('content', { read: TemplateRef }) contentTemplate!: TemplateRef<any>;
}
