import { Component, input } from '@angular/core';
import type { DeviceItem } from '~/api/api.types';
import { Icon } from '~/app/components/icon/icon';
import { Toggle } from '~/app/components/toggle/toggle';

@Component({
  selector: 'app-device',
  imports: [Icon, Toggle],
  templateUrl: './device.html',
  styleUrl: './device.scss'
})
export class DeviceComponent {
  public onSwitch = input.required<(_item: DeviceItem) => void>()
  public data = input.required<DeviceItem>()

  onToggle() {
    this.onSwitch()(this.data())
  }

  isLamp = () => this.data().icon === 'lightbulb'
}
