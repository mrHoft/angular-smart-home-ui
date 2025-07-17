import { Component, input } from '@angular/core';
import type { CardItem, TLayout } from '~/api/api.types';
import { MatIconModule } from '@angular/material/icon';
import { SensorValuePipe } from '~/app/entity/pipes/sensor-value-pipe';

const defaultData: CardItem = {
  type: "sensor",
  icon: 'cloud',
  label: '',
  value: {
    amount: 0,
    unit: ''
  }
}

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [MatIconModule, SensorValuePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss'
})
export class SensorComponent {
  public layout = input<TLayout>('verticalLayout')
  public data = input<CardItem>(defaultData)
}
