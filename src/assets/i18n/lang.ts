// 本项目支持的语言列表，请各位Translator在添加新的语言之后在此处更改
// 啊啊啊人生第一个ts文件好开心，模块化（x）是真心好用啊，C#都做不到直接导出常量的

const langs = ['de', 'en', 'es', 'fr', 'it', 'ja', 'nl', 'pt', 'ru', 'zh-tw', 'zh'];
const preferredlang = 'zh';
export {langs, preferredlang};

// 以下是翻译的初始化

import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

export class TranslateInit {

    public static getLang(translate: TranslateService, request: Request, platformId: any): string {
        let lang: string;
        if (isPlatformBrowser(platformId)) {
          lang = translate.getBrowserLang();
        } else {
          lang = (request.headers['accept-language'] || '').substring(0, 2);
        }
        return lang;
      }

    public static Init(translate: TranslateService, 
        request: Request, 
        platformId: any) {

        // 此处选择语言
        translate.addLangs(langs);
        translate.setDefaultLang(preferredlang);

        // 使用如下语句更改语言
        // translate.use("en");

        // 检测Browser语言（个人感觉毕竟是在OBS里面，这个检测没啥用……）
        const browserLang = TranslateInit.getLang(
            translate, request, platformId
        )
        translate.use(preferredlang);
        langs.forEach(l => {
          if (browserLang.match(l)) { translate.use(l); }
        });

        // 完毕（我觉得语言这种东西放到网址的query里面更好，然而我并不会弄）

  }
}
// 开心，这样所有component就都可以用了吧
