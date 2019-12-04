import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GkdRoutingModule } from './gkd-routing.module';
import { GKDComponent } from './gkd.component';
import { SharedModule } from '../shared/shared.module';
import { GkdRendererModule } from './gkd-renderer/gkd-renderer.module';
import { GkdTickerRendererModule } from './gkd-ticker-renderer/gkd-ticker-renderer.module';

@NgModule({
  declarations: [
    GKDComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GkdRoutingModule,
    GkdRendererModule,
    GkdTickerRendererModule
  ]
})
export class GkdModule { }
