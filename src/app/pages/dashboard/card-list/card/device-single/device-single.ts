import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { CardItem } from '~/api/api.types';
import { NgClass } from '@angular/common';

const defaultValue: CardItem = {
  type: "device",
  icon: 'cloud',
  label: '',
  state: false
}

@Component({
  selector: 'app-device-single',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './device-single.html',
  styleUrl: './device-single.scss'
})
export class DeviceSingleComponent {
  public data = input<CardItem>(defaultValue)
  protected item: CardItem = defaultValue
  protected stateClasses: Record<string, boolean> = {};

  onClick = () => {
    this.item.state = !this.item.state
    this.updateClasses()
  }

  ngOnInit() {
    this.item = this.data()
    this.updateClasses()
  }

  private updateClasses = () => {
    this.stateClasses = {
      state: true,
      icon_on: this.item.state || false,
      icon_off: !this.item.state,
    };
  }
}
