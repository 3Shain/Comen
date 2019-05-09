import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {HttpClient} from "@angular/common/http";

import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { MessageComponent } from './alpha/message/message.component';
import { ImageComponent } from './alpha/image/image.component';
import { IndexComponent } from './index/index.component';
import { ChatRendererComponent } from './alpha/chat-renderer/chat-renderer.component';
import { HttpClientModule } from '@angular/common/http';
import { LegacyPaidMessageComponent } from './alpha/paid-message/paid-message.component';
import { ViewerComponent } from './viewer/viewer.component';
import { IndexLocalComponent } from './index-local/index-local.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    MessageComponent,
    ImageComponent,
    IndexComponent,
    ChatRendererComponent,
    LegacyPaidMessageComponent,
    ViewerComponent,
    IndexLocalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  providers: [TranslateService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
