import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { MessageComponent } from './alpha/message/message.component';
import { ImageComponent } from './alpha/image/image.component';
import { AuthorChipComponent } from './alpha/author-chip/author-chip.component';
import { IndexComponent } from './index/index.component';
import { ChatRendererComponent } from './alpha/chat-renderer/chat-renderer.component';
import { HttpClientModule } from '@angular/common/http';
import { LegacyPaidMessageComponent } from './alpha/paid-message/paid-message.component';

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    MessageComponent,
    ImageComponent,
    AuthorChipComponent,
    IndexComponent,
    ChatRendererComponent,
    LegacyPaidMessageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
