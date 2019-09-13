import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlphaRoutingModule } from './alpha-routing.module';
import { AlphaComponent } from './alpha.component';
import { ChatRendererModule } from './chat-renderer/chat-renderer.module';

@NgModule({
  declarations: [
    AlphaComponent
  ],
  imports: [
    CommonModule,
    ChatRendererModule,
    AlphaRoutingModule
  ]
})
export class AlphaModule { }
