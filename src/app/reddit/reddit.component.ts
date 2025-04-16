import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-reddit',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <div class="container mx-auto">
      <pre>{{ redditData() | json }}</pre>
    </div>
  `,
  styles: ``,
})
export default class RedditComponent {
  private http = inject(HttpClient);

  redditData = toSignal(
    this.http.get('/picsum/v2/list?page=1&limit=5').pipe(
      map((response) => response),
      tap((response) => {
        console.log(response);
      })
    )
  );
}
