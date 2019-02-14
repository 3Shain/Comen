import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MessageProcessorService } from '../message-processor.service';

@Component({
  selector: 'app-alpha',
  templateUrl: './alpha.component.html',
  styleUrls: ['./alpha.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AlphaComponent implements OnInit {

  currentRoomId:number;

  constructor(private route: ActivatedRoute,
    private title: Title,
    private proc: MessageProcessorService) { }

  ngOnInit() {
    this.currentRoomId=this.route.snapshot.params["id"];
    this.title.setTitle("直播间"+this.currentRoomId);
    
    if(this.route.snapshot.queryParamMap.has('loadAvatar')){
      this.proc.loadAvatar=this.route.snapshot.queryParamMap.get('loadAvatar').toLowerCase()=='true';
    }
    if(this.route.snapshot.queryParamMap.has('levelFilter')){
      this.proc.userLevelFilter=Number(this.route.snapshot.queryParamMap.get('levelFilter'));
    }
    if(this.route.snapshot.queryParamMap.has('hideGiftDanmaku')){
      this.proc.hideGiftDanmaku=this.route.snapshot.queryParamMap.get('hideGiftDanmaku').toLowerCase()=='true';
    }
    if(this.route.snapshot.queryParamMap.has('showGift')){
      this.proc.showGift=this.route.snapshot.queryParamMap.get('showGift').toLowerCase()=='true';
    }
    if(this.route.snapshot.queryParamMap.has('wordFilter')){
      this.proc.wordFilter.concat(String(this.route.snapshot.queryParamMap.get('wordFilter')).split(','));
    }
  }
}
