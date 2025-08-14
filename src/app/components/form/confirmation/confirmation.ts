import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  imports: [],
  template: /* html */`
    <h3>{{text()}}</h3>
    <div class="btns">
      <button type="button" (click)="onYes()">Yes</button>
      <button type="button" (click)="onCancel()">Cancel</button>
    </div>
  `,
  styles: /* css */`
  .btns {
    display: flex;
    justify-content: space-around;
  }
  `
})
export class Confirmation {
  public text = input<string>("Are you sure?")
  public result = output<boolean>()

  protected onYes() {
    this.result.emit(true);
  }

  protected onCancel() {
    this.result.emit(false);
  }
}
