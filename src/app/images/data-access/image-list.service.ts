import { computed, inject, Injectable, signal } from '@angular/core';
import { Image } from '../types/image';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, merge, Subject, switchMap, tap } from 'rxjs';
import { connect } from 'ngxtension/connect';

export type ImageListState = {
  images: Image[];
  page: number;
  limit: number;
  loaded: boolean;
  error: string | null;
};

@Injectable({ providedIn: 'root' })
export class ImageListService {
  private http = inject(HttpClient);

  private state = signal<ImageListState>({
    images: [],
    page: 0,
    limit: 10,
    loaded: false,
    error: null,
  });

  images = computed(() => this.state().images);
  loaded = computed(() => this.state().loaded);
  page = computed(() => this.state().page);
  error = computed(() => this.state().error);

  loadNext$ = new Subject<void>();
  pageNumber$ = new Subject<number>();

  private error$ = new Subject<string | null>();
  private load$ = merge(
    this.pageNumber$.pipe(
      tap((page) => {
        this.state.update((state) => ({
          ...state,
          page: page,
        }));
      }),
      map((page) => page)
      //switchMap(() => this.fetchImages(this.state().page, this.state().limit))
    ),
    this.loadNext$.pipe(
      tap(() => {
        this.state.update((state) => ({
          ...state,
          page: state.page + 1,
        }));
      }),
      map(() => this.state().page)
      //switchMap(() => this.fetchImages(this.state().page, this.state().limit))
    )
  ).pipe(switchMap((page) => this.fetchImages(page, this.state().limit)));

  constructor() {
    const nextState$ = merge(this.error$.pipe(map((error) => ({ error }))));

    connect(this.state)
      .with(nextState$)
      .with(this.load$, (state, images) => ({
        ...state,
        images: [...state.images, ...images],
        loaded: true,
      }));

    /*.with(
        this.pageNumber$.pipe(
          switchMap((page) => this.fetchImages(page, this.state().limit))
        ),
        (state, images) => ({
          ...state,
          images: [...state.images, ...images],
          loaded: true,
        })
      )
      .with(
        this.loadNext$.pipe(
          switchMap(() =>
            this.fetchImages(this.state().page + 1, this.state().limit)
          )
        ),
        (state, images) => ({
          ...state,
          page: state.page + 1,
          images: [...state.images, ...images],
          loaded: true,
        })
      );*/
  }

  private fetchImages(page: number, limit: number) {
    const apiUrl = `/picsum/v2/list?page=${page}&limit=${limit}`;
    return this.http.get<Image[]>(apiUrl).pipe(
      catchError((err) => {
        this.error$.next(err.statusText);
        return EMPTY;
      }),
      map((response) => response)
    );
  }
}
