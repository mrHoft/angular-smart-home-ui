import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '~/api/user.service';
import { Router } from '@angular/router';

const EXAMPLE_CREDENTIALS = {
  userName: 'Hobbs',
  password: 'sit'
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class PageLogin {
  private router = inject(Router);
  private userService = inject(UserService);
  protected exampleCredentials = EXAMPLE_CREDENTIALS
  protected errorMessage = signal<string | null>(null);

  protected clearError() {
    this.errorMessage.set(null);
  }

  protected form = new FormGroup({
    userName: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true })
  });


  ngOnInit() {
    this.form.patchValue(this.exampleCredentials);
  }

  protected onSubmit() {
    const value = this.form.getRawValue();
    this.userService.login(value).subscribe({
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage.set('Invalid login or password.');
        } else {
          this.errorMessage.set('Unknown error occurred. Please try again later.');
        }
      },
      next: () => {
        this.router.navigate(['/']);
      }
    });
  }
}
