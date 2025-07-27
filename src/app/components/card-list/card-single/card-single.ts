import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { CardData, CardItem } from '~/api/api.types';
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

  protected item = () => this.data().items[0]

  onToggle() {
    const item = this.data().items[0]
    item.state = !item.state
    this.highlight.set(item.state || false)
  }

  isLamp = () => this.data().items[0].icon === 'lightbulb'

  ngOnInit() {
    this.highlight.set(this.data().items[0].state || false)
  }
}
