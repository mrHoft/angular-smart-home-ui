import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DashboardItem } from '~/api/api.types';
import { icons } from '~/data/icons';

@Component({
  selector: 'app-add-dashboard',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './add-dashboard.html',
  styleUrl: './add-dashboard.scss'
})
export class AddDashboard {
  protected icons = icons
  public result = output<DashboardItem>()

  protected form = new FormGroup({
    id: new FormControl(Date.now().toString(), { nonNullable: true }),
    title: new FormControl('Dashboard', { nonNullable: true }),
    icon: new FormControl('home', { nonNullable: true }),
  });

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }
}
