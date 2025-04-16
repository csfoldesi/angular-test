import { computed, inject, Injectable, signal } from '@angular/core';
import { User, UserLogin } from '../interfaces/user';
import { catchError, EMPTY, map, merge, Subject, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/types';
import { connect } from 'ngxtension/connect';

export type AuthState = {
  user: User | null;
  loaded: boolean;
  error: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private state = signal<AuthState>({
    user: null,
    loaded: false,
    error: null,
  });

  user = computed(() => this.state().user);
  error = computed(() => this.state().error);

  login$ = new Subject<UserLogin>();
  logout$ = new Subject<void>();
  userProfile$ = new Subject<void>();

  private error$ = new Subject<string | null>();

  constructor() {
    const nextState$ = merge(this.error$.pipe(map((error) => ({ error }))));

    connect(this.state)
      .with(nextState$)
      .with(
        this.login$.pipe(switchMap((login) => this.callLogIn(login))),
        (state, user) => ({
          ...state,
          user,
          loaded: true,
        })
      )
      .with(
        this.userProfile$.pipe(switchMap(() => this.callUserProfile())),
        (state, user) => {
          console.log(user);
          return {
            ...state,
          };
        }
      );
  }

  private callLogIn(userLogIn: UserLogin) {
    const apiUrl = import.meta.env.NG_APP_AUTH_URL + '/signin';
    return this.http.post<ApiResponse<User>>(apiUrl, userLogIn).pipe(
      catchError((err) => {
        this.error$.next(err.statusText);
        return EMPTY;
      }),
      map((response) => response.data)
    );
  }

  private callUserProfile() {
    const apiUrl = import.meta.env.NG_APP_AUTH_URL;
    return this.http.get<ApiResponse<User>>(apiUrl).pipe(
      catchError((err) => {
        this.error$.next(err.statusText);
        return EMPTY;
      }),
      map((response) => response.data)
    );
  }
}
