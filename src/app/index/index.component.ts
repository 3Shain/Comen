import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(@Inject(PLATFORM_ID) private plat: Object) { }

  ngOnInit() {
    if(!isPlatformBrowser(this.plat)){
      return;
    }
    setTimeout(()=>{
      window.location.href="https://github.com/3Shain/BiliChat";
    },5000);
  }

}
