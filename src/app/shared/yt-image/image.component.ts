import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'yt-img-shadow',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageComponent {

  @Input() avatarUrl: string;

  @Input() height: number;

  @Input() width: number;

  constructor() { }

}
