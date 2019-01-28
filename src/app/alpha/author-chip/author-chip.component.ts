import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'yt-live-chat-author-chip',
  templateUrl: './author-chip.component.html',
  styleUrls: ['./author-chip.component.css']
})
export class AuthorChipComponent implements OnInit {

  @Input("username") username:string;

  constructor() { }

  ngOnInit() {
  }

}
