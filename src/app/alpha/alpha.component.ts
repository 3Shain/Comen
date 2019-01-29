import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BiliwsService } from '../biliws.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AlphaComponent implements OnInit {

  currentRoomId:number;

  constructor(private route: ActivatedRoute
    ,private title: Title) { }

  ngOnInit() {
    this.currentRoomId=this.route.snapshot.params["id"];
    this.title.setTitle("BILICHAT-直播间"+this.currentRoomId);
  }
}
