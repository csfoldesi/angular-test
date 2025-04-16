import { Component, inject, Input, OnInit } from '@angular/core';
import { CourseService } from '../shared/data-access/course.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  template: `
    @if(course(); as course){
    <h1>{{ course.title }}</h1>
    }
  `,
  styles: ``,
})
export default class CourseComponent implements OnInit {
  @Input() id!: string;

  courseService = inject(CourseService);
  course = this.courseService.course;

  constructor() {}

  ngOnInit(): void {
    this.courseService.courseId$.next(this.id);
  }
}
