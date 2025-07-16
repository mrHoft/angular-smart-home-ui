import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import type { CardData, CardItemData } from '~/api/api.types';
import { Sensor } from './sensor/sensor';
import { Device } from './device/device';
import { DeviceSingle } from './device-single/device-single';

const defaultValue: CardData = { id: '0', title: '', layout: "horizontalLayout", items: [] }
const groupToggle: CardItemData = {
  type: "device",
  icon: 'group',
  label: 'Group toggle',
  state: true
}

@Component({
  selector: 'app-card',
  imports: [MatIconModule, Sensor, Device, DeviceSingle, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  public data = input<CardData>(defaultValue)
  protected card: CardData & { single: boolean } = { ...defaultValue, single: true }

  ngOnInit() {
    const data = this.data()
    this.card = { ...data, single: data.items.length === 1 && data.items[0].type === 'device' }
    const group = data.items.reduce<{ count: number, state: boolean }>((acc, cur) => {
      if (cur.type === 'device') {
        acc.count += 1
        acc.state = cur.state || acc.state
      }
      return acc
    }, { count: 0, state: false })
    if (group.count > 1) {
      this.card.items.push({ ...groupToggle, state: group.state })
    }
  }
}
