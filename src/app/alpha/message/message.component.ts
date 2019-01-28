import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yt-live-chat-text-message-renderer',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input("username") username:string;

  @Input("message") message:string;

  constructor() { }

  ngOnInit() {
  }

}
