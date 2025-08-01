import { Component, input, signal } from '@angular/core';
import type { CardData, CardItem, DeviceItem } from '~/api/api.types';
import { SensorComponent } from './sensor/sensor';
import { DeviceComponent } from './device/device';

@Component({
  selector: 'app-card',
  imports: [SensorComponent, DeviceComponent],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  public data = input.required<CardData>()
  protected groupToggle: DeviceItem = {
    type: "device",
    icon: 'power',
    label: 'Group toggle',
    state: true
  }
  protected highlight = signal(false)

  private onGroupToggle = () => {
    this.groupToggle.state = !this.groupToggle.state
    const card = this.data()
    for (const item of card.items) {
      if (item.type === 'device') {
        item.state = this.groupToggle.state
      }
    }
    this.highlight.set(this.groupToggle.state)
  }

  onToggle = (item: CardItem) => {
    if (item.label === 'Group toggle') {
      this.onGroupToggle()
    } else {
      const card = this.data()
      const el = card.items.find(el => el.label === item.label)
      if (el && el.type === 'device') {
        el.state = !el.state
        const group = this.getDeviceGroup()
        if (group.count > 1) {
          this.groupToggle.state = group.state
        }
        this.highlight.set(group.state)
      }
    }
  }

  private getDeviceGroup = () => {
    const card = this.data()
    const groupToggle = card.items.find(item => item.label === 'Group toggle')
    if (groupToggle && groupToggle.type === 'device') {
      this.groupToggle = groupToggle
    }

    return card.items.reduce<{ count: number, state: boolean, added: boolean }>((acc, cur) => {
      if (cur.type === 'device' && cur.label !== 'Group toggle') {
        acc.count += 1
        acc.state = cur.state || acc.state
      }
      return acc
    }, { count: 0, state: false, added: Boolean(groupToggle) })
  }

  ngOnInit() {
    const group = this.getDeviceGroup()
    if (!group.added && group.count > 1) {
      const card = this.data()
      card.items.push(this.groupToggle)
    }
    this.groupToggle.state = group.state
    this.highlight.set(group.state)
  }
}
