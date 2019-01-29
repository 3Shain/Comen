import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'yt-img-shadow',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  @Input("avatarUid") avatarUid:number;

  avatarUrl:string=`${environment.api_server}/images/member/noface.gif`;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get(`${environment.api_server}/v1/bilichat/avatar/${this.avatarUid}`)
          .subscribe((x:any)=>{
            if(x.success){
              this.avatarUrl=`${environment.api_server}/v1/bilichat/avatarimage/?path=${x.face}`;
          }});
  }

}
