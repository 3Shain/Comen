import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { MessageComponent } from './alpha/message/message.component';
import { ImageComponent } from './alpha/image/image.component';
import { IndexComponent } from './index/index.component';
import { ChatRendererComponent } from './alpha/chat-renderer/chat-renderer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LegacyPaidMessageComponent } from './alpha/paid-message/paid-message.component';
import { ViewerComponent } from './viewer/viewer.component';
import { IndexLocalComponent } from './index-local/index-local.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateInit } from './TranslateUtils';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
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
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
})
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TranslateInit]
})
export class AppModule { }
