import { Component, output, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectDashboards } from '~/app/state/dashboard.selectors';
import { DashboardItem } from '~/api/api.types';
import { icons } from '~/data/icons';

export type TAddDashboardResult = DashboardItem | null

const getRandomFields = () => {
  const icon = icons[Math.floor(Math.random() * icons.length)]
  const title = `${icon.charAt(0).toUpperCase()}${icon.slice(1).replace('_', ' ')}`
  return { id: `${icon}_${Date.now()}`, title, icon }
}

@Component({
  selector: 'app-add-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dashboard.html',
  styleUrl: './add-dashboard.scss'
})
export class AddDashboard {
  protected icons = icons
  public result = output<TAddDashboardResult>()
  private store = inject(Store)
  private dashboards = this.store.selectSignal(selectDashboards)
  protected form: FormGroup

  constructor() {
    const { id, icon, title } = getRandomFields()
    this.form = new FormGroup({
      id: new FormControl(id, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50), this.uniqueIdValidator.bind(this)]
      }),
      title: new FormControl(title, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      icon: new FormControl(icon, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(50)]
      }),
    });
  }

  private uniqueIdValidator(control: FormControl<string>): { [key: string]: boolean } | null {
    const exists = this.dashboards().some(item => item.id === control.value);
    return exists ? { nonUniqueId: true } : null;
  }

  protected get validationErrors(): string[] {
    const errors: string[] = [];

    for (const [key, control] of Object.entries(this.form.controls)) {
      if (control.errors && control.touched) {
        if (control.errors['required']) errors.push(`${key} is required`);
        if (control.errors['maxlength']) errors.push(`${key} is too long`);
        if (control.errors['nonUniqueId']) errors.push(`${key} must be unique`);
      }
    };

    return errors;
  }

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }

  protected onCancel() {
    this.result.emit(null);
  }
}
