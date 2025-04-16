import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiResponse, Course } from '../interfaces/types';
import { catchError, EMPTY, map, merge, Subject, switchMap, tap } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { HttpClient } from '@angular/common/http';

export interface CourseListState {
  courses: Course[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CourseListService {
  private http = inject(HttpClient);

  private state = signal<CourseListState>({
    courses: [],
    loaded: false,
    error: null,
  });

  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);
  courses = computed(() => this.state().courses);

  load$ = new Subject<void>();

  private error$ = new Subject<string | null>();

  constructor() {
    const nextState$ = merge(this.error$.pipe(map((error) => ({ error }))));

    connect(this.state)
      .with(nextState$)
      .with(
        this.load$.pipe(switchMap(() => this.fetchCourses())),
        (state, courses) => ({
          ...state,
          courses,
          loaded: true,
        })
      );
  }

  private fetchCourses() {
    const apiUrl = import.meta.env.NG_APP_API_URL + '/courses';
    return this.http.get<ApiResponse<Course[]>>(apiUrl).pipe(
      catchError((err) => {
        this.error$.next(err.statusText);
        return EMPTY;
      }),
      map((response) => response.data)
    );
  }
}
