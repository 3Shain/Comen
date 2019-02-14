import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'yt-img-shadow',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  avatarUrl:string;

  @Input("userid") userid:number;

  @Input("height") height:number;

  @Input("width") width:number;

  constructor() { }

  ngOnInit() {
    switch(Number(this.userid)){
      case -1:
        this.avatarUrl='favicon.ico';
        break;
      case 0:
        this.avatarUrl='https://static.hdslb.com/images/member/noface.gif';
        break;
      default:
        this.avatarUrl=`${environment.api_server}/avatar/${this.userid}`;
    }
  }

}
