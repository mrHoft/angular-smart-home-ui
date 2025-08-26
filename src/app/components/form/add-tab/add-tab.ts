import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAllTabs } from '~/app/state/dashboard.selectors';
import { sanitize } from '~/app/utils/sanitize';

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
  private store = inject(Store)
  private tabs = this.store.selectSignal(selectAllTabs)

  protected form = new FormGroup({
    title: new FormControl(`Tab ${Math.floor(Math.random() * 10)}`, {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50), this.uniqueIdValidator.bind(this)]
    }),
  });

  private uniqueIdValidator(control: FormControl<string>): { [key: string]: boolean } | null {
    const id = sanitize(control.value)
    const exists = this.tabs().some(item => item.id === id);
    return exists ? { nonUniqueId: true } : null;
  }

  get validationErrors(): string {
    const control = this.form.controls.title;
    if (control.errors?.['required']) return 'title is required';
    if (control.errors?.['maxlength']) return 'title must be less than 50 characters';
    if (control.errors?.['nonUniqueId']) return 'title must be unique';
    return '';
  }

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }

  protected onCancel() {
    this.result.emit(null);
  }
}
