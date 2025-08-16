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
  protected groupToggle?: DeviceItem
  protected highlight = signal(false)

  public onGroupToggle = () => {
    if (this.groupToggle) {
      this.groupToggle.state = !this.groupToggle.state
      const card = this.data()
      for (const item of card.items) {
        if (item.type === 'device') {
          item.state = this.groupToggle.state
        }
      }
      this.highlight.set(this.groupToggle.state)
    }
  }

  public onToggle = (item: CardItem) => {
    const card = this.data()
    const el = card.items.find(el => el.label === item.label)
    if (el && el.type === 'device') {
      el.state = !el.state
      const group = this.getDeviceGroup()
      if (this.groupToggle) {
        this.groupToggle.state = group.state
      }
      this.highlight.set(group.state)
    }
  }

  private getDeviceGroup = () => {
    const card = this.data()

    return card.items.reduce<{ count: number, state: boolean }>((acc, cur) => {
      if (cur.type === 'device' && cur.label !== 'Group toggle') {
        acc.count += 1
        acc.state = cur.state || acc.state
      }
      return acc
    }, { count: 0, state: false })
  }

  ngOnInit() {
    const group = this.getDeviceGroup()
    if (group.count > 1) {
      this.groupToggle = {
        type: "device",
        icon: 'power',
        label: 'Group toggle',
        state: group.state
      }
    }
  }
}
