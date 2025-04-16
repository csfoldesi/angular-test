import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/data-access/auth-servive';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, LoginFormComponent],
  template: `
    <div class="container mx-auto">
      <app-login-form
        (onSubmit)="this.autheService.login$.next($event)"
      ></app-login-form>
      @if(user(); as user) {
      <p>Logged in as {{ user.name }}</p>
      } @else {
      <p>Not logged in</p>
      }
      <button
        mat-flat-button
        color="primary"
        (click)="autheService.userProfile$.next()"
      >
        Get user profile
      </button>
    </div>
  `,
  styles: ``,
})
export default class LoginComponent {
  autheService = inject(AuthService);
  user = this.autheService.user;
}
