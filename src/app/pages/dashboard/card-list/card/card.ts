import { Component, input, signal } from '@angular/core';
import type { CardData, CardItem } from '~/api/api.types';
import { SensorComponent } from './sensor/sensor';
import { DeviceComponent } from './device/device';
import { DeviceSingleComponent } from './device-single/device-single';

const defaultValue: CardData = { id: '0', title: '', layout: "horizontalLayout", items: [] }

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SensorComponent, DeviceComponent, DeviceSingleComponent],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  public data = input<CardData>(defaultValue)
  protected card: CardData & { single: boolean } = { ...defaultValue, single: true }
  protected groupToggle: CardItem = {
    type: "device",
    icon: 'power',
    label: 'Group toggle',
    state: true
  }
  protected highlight = signal(false)


  private onGroupToggle = () => {
    this.groupToggle.state = !this.groupToggle.state
    for (const item of this.card.items) {
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
      const el = this.card.items.find(el => el.label === item.label)
      if (el) {
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
    const groupToggle = this.card.items.find(item => item.label === 'Group toggle')
    if (groupToggle) {
      this.groupToggle = groupToggle
    }
    return this.card.items.reduce<{ count: number, state: boolean, added: boolean }>((acc, cur) => {
      if (cur.type === 'device' && cur.label !== 'Group toggle') {
        acc.count += 1
        acc.state = cur.state || acc.state
      }
      return acc
    }, { count: 0, state: false, added: Boolean(groupToggle) })
  }

  ngOnInit() {
    const data = this.data()
    this.card = { ...data, single: data.items.length === 1 && data.items[0].type === 'device' }
    const group = this.getDeviceGroup()
    if (!group.added && group.count > 1) {
      this.card.items.push(this.groupToggle)
    }
    this.groupToggle.state = group.state
    this.highlight.set(group.state)
  }
}
