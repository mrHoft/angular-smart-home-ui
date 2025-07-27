import { Component, input } from '@angular/core';
import type { CardItem, TLayout } from '~/api/api.types';
import { MatIconModule } from '@angular/material/icon';
import { SensorValuePipe } from '~/app/entity/pipes/sensor-value-pipe';

@Component({
  selector: 'app-sensor',
  imports: [MatIconModule, SensorValuePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss'
})
export class SensorComponent {
  public layout = input<TLayout>('verticalLayout')
  public data = input.required<CardItem>()
}
