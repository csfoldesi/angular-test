import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiResponse, Course } from '../interfaces/types';
import { catchError, EMPTY, map, merge, Subject, switchMap, tap } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { HttpClient } from '@angular/common/http';

export interface CourseState {
  course: Course | null;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  private state = signal<CourseState>({
    course: null,
    loaded: false,
    error: null,
  });

  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);
  course = computed(() => this.state().course);

  courseId$ = new Subject<string>();

  private load$ = this.courseId$.pipe(switchMap((id) => this.fetchCourses(id)));
  private error$ = new Subject<string | null>();

  constructor() {
    const nextState$ = merge(this.error$.pipe(map((error) => ({ error }))));

    connect(this.state)
      .with(nextState$)
      .with(this.load$, (state, course) => ({
        ...state,
        course,
        loaded: true,
      }));
  }

  private fetchCourses(id: string) {
    const apiUrl = `${import.meta.env.NG_APP_API_URL}/courses/${id}`;
    return this.http.get<ApiResponse<Course>>(apiUrl).pipe(
      catchError((err) => {
        this.error$.next(err.statusText);
        return EMPTY;
      }),
      map((response) => response.data)
    );
  }
}
