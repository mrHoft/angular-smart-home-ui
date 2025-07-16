import { Component, input } from '@angular/core';
import type { CardItem, TLayout } from '~/api/api.types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sensor',
  imports: [MatIconModule],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss'
})
export class Sensor {
  public layout = input<TLayout>('verticalLayout')
  public data = input<CardItem>({
    type: "sensor",
    icon: 'cloud',
    label: '',
    value: {
      amount: 0,
      unit: ''
    }
  })
}
