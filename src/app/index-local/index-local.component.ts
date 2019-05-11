import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateInit } from '../../TranslateUtils';

@Component({
  selector: 'app-index-local',
  templateUrl: './index-local.component.html',
  styleUrls: ['./index-local.component.css']
})
export class IndexLocalComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  public translateinit: TranslateInit,
  @Inject(PLATFORM_ID) public platformId: any) { }

  ngOnInit() {
    this.translateinit.Init(this.translate, this.platformId);
  }

}
