import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { MessageComponent } from './alpha/message/message.component';
import { ImageComponent } from './alpha/image/image.component';
import { AuthorChipComponent } from './alpha/author-chip/author-chip.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    MessageComponent,
    ImageComponent,
    AuthorChipComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
