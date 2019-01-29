import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'yt-live-chat-author-chip',
  templateUrl: './author-chip.component.html',
  styleUrls: ['./author-chip.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthorChipComponent implements OnInit {

  @Input("username") username:string;

  constructor() { }

  ngOnInit() {
  }

}
