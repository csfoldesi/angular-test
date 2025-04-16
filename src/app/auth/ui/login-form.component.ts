import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserLogin } from '../../shared/interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
  ],
  template: `
    <p>Please log in</p>
    <form
      [formGroup]="loginForm"
      (ngSubmit)="onSubmit.emit(loginForm.getRawValue())"
    >
      <div class="flex flex-col max-w-[600px]">
        <div class="flex">
          <mat-form-field class="p-2 flex-1">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" />
          </mat-form-field>
          <mat-form-field class="p-2 flex-1">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" />
          </mat-form-field>
        </div>
        <div class="flex justify-end">
          <button mat-flat-button color="accent" class="m-2" routerLink="/">
            Cancel
          </button>
          <button mat-flat-button color="primary" type="submit" class="m-2">
            Log In
          </button>
        </div>
      </div>
    </form>
  `,
  styles: ``,
})
export class LoginFormComponent {
  onSubmit = output<UserLogin>();
  cancel = output();

  formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.nonNullable.group({
    email: [''],
    password: [''],
  });
}
