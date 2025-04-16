import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card class="p-2 overflow-hidden">
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div
          className="relative w-full aspect-video rounded-md overflow-hidden"
        >
          <img [src]="imageUrl()" class="object-cover" />
        </div>
        <p>{{ category() }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class CourseCardComponent {
  title = input.required<string>();
  imageUrl = input<string>();
  category = input<string>();
}
