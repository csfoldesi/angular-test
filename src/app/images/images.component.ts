import { Component, inject, OnInit } from '@angular/core';
import { ImageListService } from './data-access/image-list.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="container mx-auto">
      <h1>Images</h1>
      <ul>
        @for(image of images(); track image.id){
        <li>{{ image.author }}</li>
        }
      </ul>
      <p>
        <button
          mat-flat-button
          color="primary"
          (click)="imageListservice.loadNext$.next()"
        >
          Load more
        </button>
      </p>
      <p>
        <button
          mat-flat-button
          color="primary"
          (click)="imageListservice.pageNumber$.next(page() + 1)"
        >
          Page + 1
        </button>
      </p>
      <p>page: {{ page() }}</p>
    </div>
  `,
  styles: ``,
})
export default class ImagesComponent implements OnInit {
  imageListservice = inject(ImageListService);

  images = this.imageListservice.images;
  page = this.imageListservice.page;

  ngOnInit(): void {
    this.imageListservice.loadNext$.next();
  }
}
