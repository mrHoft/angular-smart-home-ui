import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DashboardItem } from '~/api/api.types';
import { icons } from '~/data/icons';

export type TAddDashboardResult = DashboardItem | null

@Component({
  selector: 'app-add-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dashboard.html',
  styleUrl: './add-dashboard.scss'
})
export class AddDashboard {
  protected icons = icons
  public result = output<TAddDashboardResult>()
  private icon = icons[Math.floor(Math.random() * icons.length)]
  private title = `${this.icon.charAt(0).toUpperCase()}${this.icon.slice(1).replace('_', ' ')}`

  protected form = new FormGroup({
    id: new FormControl(this.icon, { nonNullable: true }),
    title: new FormControl(this.title, { nonNullable: true }),
    icon: new FormControl(this.icon, { nonNullable: true }),
  });

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }

  protected onCancel() {
    this.result.emit(null);
  }
}
