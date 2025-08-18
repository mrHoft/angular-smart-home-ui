import { Component, input, signal, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import type { CardData, DeviceItem } from '~/api/api.types';
import { LampHighlight } from '~/app/entity/directives/lamp-highlight';
import { toggleDevice } from '~/app/state/device.actions';

@Component({
  selector: 'app-card-single',
  imports: [MatIconModule, LampHighlight],
  templateUrl: './single.html',
  styleUrl: './single.scss'
})
export class CardSingleComponent {
  private store = inject(Store);
  public data = input.required<CardData>()
  protected device?: DeviceItem
  protected highlight = signal(false)

  onToggle() {
    if (this.device && !this.device.id.startsWith('example')) {
      this.device.state = !this.device.state
      this.highlight.set(this.device.state)
      this.store.dispatch(toggleDevice({ id: this.device.id, state: this.device.state }));
    }
  }

  isLamp = () => this.device?.icon === 'lightbulb'

  ngOnInit() {
    const item = this.data().items[0]
    if (item.type === 'device') {
      this.device = { ...item }
      this.highlight.set(item.state)
    }
  }
}
