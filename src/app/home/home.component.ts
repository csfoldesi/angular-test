import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  template: `
    <div class="container mx-auto flex flex-col">
      <h1 class="text-3xl font-bold">Home</h1>
      <p>
        <button mat-flat-button color="primary" routerLink="/courses">
          Go to courses
        </button>
      </p>
      <p>
        <button mat-flat-button color="primary" routerLink="/blog">
          Go to blog
        </button>
      </p>
      <p>
        <button mat-flat-button color="primary" routerLink="/images">
          Go to images
        </button>
      </p>
      <p>
        <button mat-flat-button color="primary" routerLink="/login">
          Log In
        </button>
      </p>
      <p>
        <button mat-flat-button color="primary" routerLink="/reddit">
          Go to Reddit
        </button>
      </p>
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {}
