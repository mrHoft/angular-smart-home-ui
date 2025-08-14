import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-square-button',
  imports: [],
  templateUrl: './square-button.html',
  styleUrl: './square-button.scss'
})
export class SquareButton {
  public icon = input.required<string>()
  public onClick = output<void>()

  protected iconSrc = () => {
    switch (this.icon()) {
      case ('edit'): {
        return "./assets/edit.svg"
      }
      case ('del'): {
        return "./assets/trash.svg"
      }
      default: {
        return "./assets/cross.svg"
      }
    }
  }

  protected handleClick = () => {
    this.onClick.emit()
  }
}
