import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import type { CardItem } from '~/api/api.types';
import { LampHighlight } from '../directives/lamp-highlight';

const defaultValue: CardItem = {
  type: "device",
  icon: 'cloud',
  label: '',
  state: false
}

@Component({
  selector: 'app-device-single',
  standalone: true,
  imports: [MatIconModule, LampHighlight],
  templateUrl: './device-single.html',
  styleUrl: './device-single.scss'
})
export class DeviceSingleComponent {
  public onSwitch = input<(_item: CardItem) => void>((_item: CardItem) => undefined)
  public data = input<CardItem>(defaultValue)
  protected item: CardItem = defaultValue

  onToggle() {
    this.onSwitch()(this.item)
  }

  isLamp = () => this.item.icon === 'lightbulb'

  ngOnInit() {
    this.item = this.data()
  }
}
