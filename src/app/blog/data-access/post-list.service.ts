import { computed, inject, Injectable, signal } from '@angular/core';
import { Post } from '../types/post';
import { HttpClient } from '@angular/common/http';

export type PostListState = {
  posts: Post[];
  loaded: boolean;
  error: string | null;
};

@Injectable({ providedIn: 'root' })
export class PostListService {
  private http = inject(HttpClient);

  private state = signal<PostListState>({
    posts: [],
    loaded: false,
    error: null,
  });

  posts = computed(() => this.state().posts);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);
}
