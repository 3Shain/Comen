import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'yt-img-shadow',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  @Input("avatarUrl") avatarUrl:number;

  @Input("height") height:number;

  @Input("width") width:number;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    
  }

}
