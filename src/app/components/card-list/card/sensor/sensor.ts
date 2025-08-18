import { Component, input } from '@angular/core';
import type { SensorItem, TLayout } from '~/api/api.types';
import { Icon } from '~/app/components/icon/icon';
import { SensorValuePipe } from '~/app/entity/pipes/sensor-value-pipe';

@Component({
  selector: 'app-sensor',
  imports: [Icon, SensorValuePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss'
})
export class SensorComponent {
  public layout = input<TLayout>('verticalLayout')
  public data = input.required<SensorItem>()
}
