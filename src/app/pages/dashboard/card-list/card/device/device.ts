import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import type { CardItem } from '~/api/api.types';

const defaultValue: CardItem = {
  type: "device",
  icon: 'cloud',
  label: '',
  state: false
}

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss'
})
export class DeviceComponent {
  public onSwitch = input<(_item: CardItem) => void>((_item: CardItem) => undefined)
  public data = input<CardItem>(defaultValue)
  protected item: CardItem = defaultValue
  protected stateClasses: Record<string, boolean> = {};

  onToggle() {
    this.onSwitch()(this.item)
  }

  ngOnInit() {
    this.item = this.data()
  }
}
