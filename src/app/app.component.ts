import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseListService } from './shared/data-access/course-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './shared/data-access/auth-servive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: [],
})
export class AppComponent {
  courseService = inject(CourseListService);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const error = this.courseService.error();
      if (error !== null) {
        this.snackBar.open(error, 'Dismiss', { duration: 2000 });
      }
    });
    effect(() => {
      const error = this.authService.error();
      if (error !== null) {
        this.snackBar.open(error, 'Dismiss', { duration: 2000 });
      }
    });
  }
}
