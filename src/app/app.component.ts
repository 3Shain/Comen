import { Component, OnInit, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';

const langs = ['en', 'zh', 'ja'];
const defaultLang = 'zh';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bilichat';

  constructor(private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional()
    @Inject(REQUEST) private request: Request) {
  }

  ngOnInit() {
    this.translate.addLangs(langs);
    this.translate.setDefaultLang(defaultLang);
    const language = this.getLang();
    if (langs.indexOf(language) > -1) {
      this.translate.use(language);
    } else {
      this.translate.use(defaultLang);
    }
  }

  public getLang(): string {
    let lang: string;
    lang = this.getDefaultLang();
    return lang;
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  public getCookie(key: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return null;
    } else {
      return null;
    }
  }

  public getQuery(key: string): string {
    if (isPlatformBrowser(this.platformId)) {
      return null;
    } else {
      return null;
    }
  }

  public getDefaultLang(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.translate.getBrowserLang();
    } else {
      return (this.request.headers['accept-language'] || '').substring(0, 2); // 暂不考虑区域代码
    }
  }
}
