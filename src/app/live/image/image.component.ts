import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

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
