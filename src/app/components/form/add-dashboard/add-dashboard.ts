import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DashboardItem } from '~/api/api.types';

@Component({
  selector: 'app-add-dashboard',
  imports: [ReactiveFormsModule],
  templateUrl: './add-dashboard.html',
  styleUrl: './add-dashboard.scss'
})
export class AddDashboard {
  public result = output<DashboardItem>()

  protected form = new FormGroup({
    id: new FormControl('001', { nonNullable: true }),
    title: new FormControl('Title', { nonNullable: true }),
    icon: new FormControl('new', { nonNullable: true }),
  });

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.result.emit(value)
  }
}
