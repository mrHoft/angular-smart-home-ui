import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import type { CardData, CardItem } from '~/api/api.types';
import { SensorComponent } from './sensor/sensor';
import { DeviceComponent } from './device/device';
import { DeviceSingleComponent } from './device-single/device-single';

const defaultValue: CardData = { id: '0', title: '', layout: "horizontalLayout", items: [] }

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [SensorComponent, DeviceComponent, DeviceSingleComponent, NgClass],
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

  private onGroupToggle = () => {
    this.groupToggle.state = !this.groupToggle.state
    this.card.items.forEach(item => {
      if (item.type === 'device') {
        item.state = this.groupToggle.state
      }
    })
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
      }
    }
  }

  private getDeviceGroup = () => this.card.items.reduce<{ count: number, state: boolean }>((acc, cur) => {
    if (cur.type === 'device' && cur.label !== 'Group toggle') {
      acc.count += 1
      acc.state = cur.state || acc.state
    }
    return acc
  }, { count: 0, state: false })

  ngOnInit() {
    const data = this.data()
    this.card = { ...data, single: data.items.length === 1 && data.items[0].type === 'device' }
    const group = this.getDeviceGroup()
    if (group.count > 1) {
      this.groupToggle.state = group.state
      this.card.items.push(this.groupToggle)
    }
  }
}
