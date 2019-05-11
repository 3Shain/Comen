import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';


// 入TService和语言列表
import {TranslateService} from '@ngx-translate/core';
import { TranslateInit } from '../../assets/i18n/lang';


@Component({
  selector: 'app-index-local',
  templateUrl: './index-local.component.html',
  styleUrls: ['./index-local.component.css']
})
export class IndexLocalComponent implements OnInit {

  constructor(
    // 入TService
    private translate: TranslateService, 

   @Inject(PLATFORM_ID) private platformId: any) { 
     
      // 一键Init翻译！
      TranslateInit.Init(translate, platformId);

      // 之后要更改语言直接用如下语句即可
        // translate.use("en");
   }

  ngOnInit() {
  }

}
