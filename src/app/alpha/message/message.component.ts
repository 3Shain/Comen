import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yt-live-chat-text-message-renderer',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  @Input("username") username:string;

  @Input("message") message:string;

  @Input("avatarUid") avatarUid:number;

  constructor() { }

  ngOnInit() {
  }

}
