import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRendererComponent } from './chat-renderer.component';
import { MessageComponent } from './message/message.component';
import { LegacyPaidMessageComponent } from './paid-message/paid-message.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ChatRendererComponent,
    MessageComponent,
    LegacyPaidMessageComponent
  ],
  imports: [
    CommonModule, 
    SharedModule
  ],
  exports:[
    ChatRendererComponent,
    MessageComponent,
    LegacyPaidMessageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatRendererModule { }
