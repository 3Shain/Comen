import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yt-live-chat-paid-message-renderer',
  templateUrl: './legacy-paid-message.component.html',
  styleUrls: ['./legacy-paid-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LegacyPaidMessageComponent implements OnInit {

  @Input("username") username:string;

  @Input("gift") gift:string;

  @Input("amount") amount:string;

  @Input("avatarUrl") avatarUrl:number;

  @Input("value") value:number;

  constructor() { }

  ngOnInit() {
  }

  getColor(){
    if(this.value>=1245){
      return '#e62117';
    }
    else if(this.value>=450){
      return '#c2185b';
    }
    else if(this.value>=300){
      return '#e65100';
    }
    else if(this.value>=200){
      return '#ffca28';
    }
    else if(this.value>=100){
      return '#00bfa5';//100
    }
    else {
      return '#00b8d4';//50
    }
  }
}
