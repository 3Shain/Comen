// 本项目支持的语言列表，请各位Translator在添加新的语言之后在此处更改

const langs = ['en', 'ja', 'zh-tw', 'zh'];
const preferredLang = 'zh';
export {langs, preferredLang};


import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

export class TranslateInit {

  constructor() {

  }

    public Init(translate: TranslateService,
        platformId: any, route: ActivatedRoute = null) {

        translate.addLangs(langs);
        translate.setDefaultLang(preferredLang);
        translate.use(preferredLang);

        // 以下根据Query选择语言
        langs.forEach(l => {
          if (route != null) { if (l === route.snapshot.queryParamMap.get('lang')) { translate.use(l); return; } }
        });

        // 以下根据浏览器自动选择语言，如需强制语言请注释掉下面所有Code
        let lang: string;
        if (isPlatformBrowser(platformId)) {
          lang = translate.getBrowserLang();
        } else {
          lang = preferredLang;
        }
        langs.forEach(l => {
          if (lang.match(l)) { translate.use(l); }
        });


  }
}
