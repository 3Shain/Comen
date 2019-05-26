import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessageProcessorService } from '../message-processor.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit {

  private currentRoomId: number;

  constructor(private route: ActivatedRoute,
    private title: Title,
    private proc: MessageProcessorService) { }

  ngOnInit() {
    this.currentRoomId = this.route.snapshot.params['id'];
    this.title.setTitle('查看模式|直播间' + this.currentRoomId);
  }

}
