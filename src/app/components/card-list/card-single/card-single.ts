import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { CardData, DeviceItem } from '~/api/api.types';
import { LampHighlight } from '~/app/entity/directives/lamp-highlight';

@Component({
  selector: 'app-card-single',
  imports: [MatIconModule, LampHighlight],
  templateUrl: './card-single.html',
  styleUrl: './card-single.scss'
})
export class CardSingleComponent {
  public data = input.required<CardData>()
  protected highlight = signal(false)

  protected item = () => this.data().items[0] as DeviceItem

  onToggle() {
    const item = this.data().items[0]
    if (item.type === 'device') {
      item.state = !item.state
      this.highlight.set(item.state || false)
    }
  }

  isLamp = () => this.data().items[0].icon === 'lightbulb'

  ngOnInit() {
    const item = this.data().items[0]
    const state = item.type === 'device' ? item.state : false
    this.highlight.set(state)
  }
}
