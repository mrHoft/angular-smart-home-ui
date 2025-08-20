import { Component, input, signal, inject, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import type { CardData, CardItem, DeviceItem } from '~/api/api.types';
import { SensorComponent } from './sensor/sensor';
import { DeviceComponent } from './device/device';
import { toggleDevice } from '~/app/state/device.actions';
import { i18n } from '~/data/i18n.en';
import { SquareButton } from '~/app/components/square-button/square-button';
import { selectEditMode } from '~/app/state/dashboard.selectors';
import { renameCard } from '~/app/state/dashboard.actions';
import { Icon } from '~/app/components/icon/icon';

@Component({
  selector: 'app-card',
  imports: [SensorComponent, DeviceComponent, SquareButton, Icon],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class CardComponent {
  private store = inject(Store);
  protected empty = i18n.emptyCard
  public data = input.required<CardData>()
  protected card?: CardData
  protected groupToggle?: DeviceItem
  protected highlight = signal(false)
  protected editMode = this.store.selectSignal(selectEditMode);
  protected editTitleMode = signal(false)

  constructor() {
    effect(() => {
      const data = this.data();
      this.card = { ...data, items: data.items.map(item => ({ ...item })) };
      this.init()
    });
  }

  public onGroupToggle = () => {
    if (this.groupToggle) {
      this.groupToggle.state = !this.groupToggle.state
      if (this.card) {
        const { items } = this.card
        for (const item of items) {
          if (item.type === 'device') {
            item.state = this.groupToggle.state
            this.store.dispatch(toggleDevice({ id: item.id, state: this.groupToggle.state }));
          }
        }
      }
      this.highlight.set(this.groupToggle.state)
    }
  }

  public onToggle = (item: CardItem) => {
    if (item.type === 'device') {
      this.store.dispatch(toggleDevice({ id: item.id, state: !item.state }));
      if (this.card) {
        const { items } = this.card
        const el = items.find(el => el.id === item.id)
        if (el && el.type === 'device') {
          el.state = !el.state
          const group = this.getDeviceGroup()
          if (this.groupToggle) {
            this.groupToggle.state = group.state
          }
          this.highlight.set(group.state)
        }
      }
    }
  }

  private getDeviceGroup = () => {
    if (!this.card) return { count: 0, state: false }
    const { items } = this.card

    return items.reduce<{ count: number, state: boolean }>((acc, cur) => {
      if (cur.type === 'device' && cur.label !== 'Group toggle') {
        acc.count += 1
        acc.state = cur.state || acc.state
      }
      return acc
    }, { count: 0, state: false })
  }

  private init = () => {
    const group = this.getDeviceGroup()
    if (group.count > 1) {
      this.groupToggle = {
        id: 'groupToggle',
        type: "device",
        icon: 'power',
        label: 'Group toggle',
        state: group.state
      }
    }
    this.highlight.set(group.state)
  }

  ngOnInit() {
    this.init()
  }

  protected handleTitleEdit = () => this.editTitleMode.update(cur => !cur)

  protected handleTitleChange = (event: Event) => {
    if (!this.editTitleMode()) return
    const el = event.target as HTMLInputElement
    this.editTitleMode.set(false)
    if (this.card) {
      this.card.title = el.value
      this.store.dispatch(renameCard({ cardId: this.card.id, title: el.value }))
    }
  }

  protected removeDevice = (id: string) => {
    console.log(id)
  }

  protected singleDevice = () => this.card?.layout === 'singleDevice' && this.card.items[0]?.type === 'device' && this.card.items[0]

  protected handleSingleDeviceToggle() {
    if (this.editMode()) return
    const device = this.singleDevice()
    if (device && !device.id.startsWith('example')) {
      device.state = !device.state
      this.highlight.set(device.state)
      this.store.dispatch(toggleDevice({ id: device.id, state: device.state }));
    }
  }
}
