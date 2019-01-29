import { Component, OnInit ,ViewEncapsulation, Input, PLATFORM_ID, Inject} from '@angular/core';
import { BiliwsService } from '../../biliws.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private bili:BiliwsService,@Inject(PLATFORM_ID)private plat:Object) { 
    this.danmakuList=new Array();
  }

  ngOnInit() {
    if(!isPlatformBrowser(this.plat)){
      return;
    }
    this.bili.initial(this._roomId);
    this.bili.obs.subscribe((x)=>{
      if(this.danmakuList.length>=100){
        this.danmakuList.shift();
      }
      this.danmakuList.push(x);
    });
  }

  ngAfterViewChecked(){
    if(!isPlatformBrowser(this.plat)){
      return;
    }
    try{
      console.log(document.body.scrollTop);
      window.scrollTo(0,document.body.scrollHeight);
      //document.documentElement.scrollTop = document.body.scrollHeight;
    }catch(err){
      console.log(err);
    }
  }

}
