import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

export type TAddDashboardTabResult = { title: string } | undefined

@Component({
  selector: 'app-add-tab',
  imports: [ReactiveFormsModule],
  templateUrl: './add-tab.html',
  styleUrl: './add-tab.scss'
})
export class AddDashboardTab {
  public result = output<TAddDashboardTabResult>()

  protected form = new FormGroup({
    title: new FormControl(`tab #${Math.floor(Math.random() * 10)}`, { nonNullable: true }),
  });

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }

  protected onCancel() {
    this.result.emit(undefined);
  }
}
