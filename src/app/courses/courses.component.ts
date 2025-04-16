import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CourseListService } from '../shared/data-access/course-list.service';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from './ui/course-card.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CourseCardComponent],
  template: `
    <div class="container mx-auto">
      <h2>Course list is going here</h2>
      <p>
        <button mat-flat-button color="primary" (click)="loadCourseList()">
          Load courses
        </button>
      </p>
      <div
        class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4"
      >
        @for(course of courseListService.courses(); track course.id){
        <a routerLink="/course/{{ course.id }}" class="cursor-pointer">
          <app-course-card
            [title]="course.title"
            [imageUrl]="course.imageUrl"
            [category]="course.category"
          ></app-course-card>
        </a>
        } @empty {
        <p>No courses</p>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export default class CoursesComponent implements OnInit {
  courseListService = inject(CourseListService);
  //courseService = inject(CourseService);

  //course = this.courseService.course;

  loadCourseList() {
    this.courseListService.load$.next();
  }

  /*loadCourse(id: string) {
    this.courseService.courseId$.next(id);
  }*/

  ngOnInit(): void {
    this.courseListService.load$.next();
  }
}
