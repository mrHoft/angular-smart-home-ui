import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import type { CardItem } from '~/api/api.types';
import { NgClass } from '@angular/common';

const defaultValue: CardItem = {
  type: "device",
  icon: 'cloud',
  label: '',
  state: false
}

@Component({
  selector: 'app-device',
  imports: [MatIconModule, MatSlideToggleModule, NgClass],
  templateUrl: './device.html',
  styleUrl: './device.scss'
})
export class Device {
  public onSwitch = input<(_item: CardItem) => void>((_item: CardItem) => undefined)
  public data = input<CardItem>(defaultValue)
  protected item: CardItem = defaultValue
  protected stateClasses: Record<string, boolean> = {};

  onToggle() {
    this.onSwitch()(this.item)
  }

  ngOnInit() {
    this.item = this.data()
    this.updateClasses()
  }

  ngDoCheck() {
    this.updateClasses()
  }

  private updateClasses = () => {
    this.stateClasses = {
      icon_on: this.item.state || false,
      icon_off: !this.item.state,
    };
  }
}
