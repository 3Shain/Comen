import { Component, OnInit, Input, ViewEncapsulation, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GiftMessage } from '../../../danmaku.def';

@Component({
  selector: 'yt-live-chat-paid-message-renderer',
  templateUrl: './paid-message.component.html',
  styleUrls: ['./paid-message.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LegacyPaidMessageComponent implements OnInit , AfterViewInit {

  @Input() item: GiftMessage;

  constructor(private ele:ElementRef,
    private renderer:Renderer2,
    private translate: TranslateService) { }

  ngOnInit() {
    this.renderer.setAttribute(this.ele.nativeElement,"style",`
    --yt-live-chat-paid-message-primary-color: ${this.item.color_theme.color_primary};
    --yt-live-chat-paid-message-secondary-color: ${this.item.color_theme.color_secondary};
    --yt-live-chat-paid-message-header-color: ${this.item.color_theme.color_header};
    --yt-live-chat-paid-message-color: ${this.item.color_theme.color_message};
    --yt-live-chat-paid-message-author-name-color: ${this.item.color_theme.color_author_name};
    `);
  }

  get title() {
    if (this.item.guard_type > 0) {
      return this.translate.instant('NEW_MEMBER_TITLE').replace('{memberType}', this.item.gift);
    } else {
      return this.translate.instant('NEW_GIFT_TITLE').replace('{username}', this.item.username);
    }
  }

  get subtitle() {
    if (this.item.guard_type > 0) {
      return this.translate.instant('NEW_MEMBER_SUBTITLE').replace('{username}', this.item.username);
    } else {
      return this.translate.instant('NEW_GIFT_SUBTITLE').replace('{gift}', this.item.gift).replace('{amount}', this.item.amount);
    }
  }

  ngAfterViewInit() {
    // if (!isPlatformBrowser(this.plat)) {
    //  return;
    // }
    // document.documentElement.scrollTop=document.documentElement.scrollHeight;
    window.scrollTo(0, document.documentElement.scrollHeight);
  }
}
