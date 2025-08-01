import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import type { DeviceItem } from '~/api/api.types';
import { LampHighlight } from '~/app/entity/directives/lamp-highlight';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule, LampHighlight],
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
