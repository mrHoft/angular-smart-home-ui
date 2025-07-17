import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { CardData, CardItem } from '~/api/api.types';
import { LampHighlight } from '~/app/entity/directives/lamp-highlight';

const defaultValue: CardData = { id: '0', title: '', layout: "horizontalLayout", items: [] }
const defaultCard: CardItem = {
  type: "device",
  icon: 'cloud',
  label: '',
  state: false
}

@Component({
  selector: 'app-card-single',
  standalone: true,
  imports: [MatIconModule, LampHighlight],
  templateUrl: './card-single.html',
  styleUrl: './card-single.scss'
})
export class CardSingleComponent {
  public data = input<CardData>(defaultValue)
  protected item: CardItem = defaultCard
  protected highlight = signal(false)

  onToggle() {
    this.item.state = !this.item.state
    this.highlight.set(this.item.state || false)
  }

  isLamp = () => this.item.icon === 'lightbulb'

  ngOnInit() {
    this.item = this.data().items[0]
    this.highlight.set(this.item.state || false)
  }
}
