import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { ChatRendererModule } from '../alpha/chat-renderer/chat-renderer.module';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    ChatRendererModule,
    IndexRoutingModule
  ]
})
export class IndexModule { }
