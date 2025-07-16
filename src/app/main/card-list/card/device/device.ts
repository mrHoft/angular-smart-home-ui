import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import type { CardItemData } from '~/api/api.types';

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss'
})
export class Device {
  public data = input<CardItemData>({
    type: "device",
    icon: 'cloud',
    label: '',
    state: false
  })
}
