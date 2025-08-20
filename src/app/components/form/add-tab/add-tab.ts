import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

export type TAddDashboardTabProps = { title?: string } | undefined
export type TAddDashboardTabResult = { title: string } | null

@Component({
  selector: 'app-add-tab',
  imports: [ReactiveFormsModule],
  templateUrl: './add-tab.html',
  styleUrl: './add-tab.scss'
})
export class AddDashboardTab {
  public title = 'Create new tab'
  public result = output<TAddDashboardTabResult>()

  protected form = new FormGroup({
    title: new FormControl(`Tab ${Math.floor(Math.random() * 10)}`, { nonNullable: true }),
  });

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }

  protected onCancel() {
    this.result.emit(null);
  }
}
