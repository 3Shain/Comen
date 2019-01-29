import { Component, OnInit ,ViewEncapsulation, Input} from '@angular/core';
import { BiliwsService } from '../../biliws.service';

@Component({
  selector: 'yt-live-chat-renderer',
  templateUrl: './chat-renderer.component.html',
  styleUrls: ['./chat-renderer.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ChatRendererComponent implements OnInit {
  danmakuList:Array<any>;

  private _roomId:number;

  @Input()
  
  public get roomId() : number {
    return this._roomId;
  }
  
  public set roomId(v : number) {
    this._roomId = v;
  }

  constructor(private bili:BiliwsService) { 
    this.danmakuList=new Array();
  }

  ngOnInit() {
    this.bili.initial(this._roomId);
    this.bili.obs.subscribe((x)=>{
      if(this.danmakuList.length>=100){
        this.danmakuList.shift();
      }
      this.danmakuList.push(x);
    });
  }

  ngAfterViewChecked(){
    try{
      console.log(document.body.scrollTop);
      window.scrollTo(0,document.body.scrollHeight);
      //document.documentElement.scrollTop = document.body.scrollHeight;
    }catch(err){
      console.log(err);
    }
  }

}
