import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '~/api/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: /* html */`<div class="login">
  <form class="login__form" [formGroup]="form" (ngSubmit)="onSubmit()">
    <h3 class="login__form_header">Please log in</h3>
    <input formControlName="userName" placeholder="name" required />
    <input formControlName="password" type="password" placeholder="password" required />
    <div class="login__form_btns">
      <button type="submit" [disabled]="form.invalid">Log in</button>
    </div>
  </form>
</div>`,
  styleUrl: './login.scss'
})
export class PageLogin {
  private userService = inject(UserService);

  protected form = new FormGroup({
    userName: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.userService.login(value);
  }
}
