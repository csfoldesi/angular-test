import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl font-bold underline">Home</h1>
      <button mat-flat-button color="primary">Basic</button>
    </div>
  `,
  styles: ``,
})
export default class HomeComponent {
  constructor() {
    console.log(import.meta.env.NG_APP_API_URL);
  }
}
