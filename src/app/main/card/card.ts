import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import type { CardData } from '~/api/api.types';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, NgClass],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  public data = input<CardData>({ id: '0', title: 'dummy', layout: "horizontalLayout", items: [] })
}
