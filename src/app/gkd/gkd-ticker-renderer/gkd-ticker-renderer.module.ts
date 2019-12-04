import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GkdTickerRendererComponent } from './gkd-ticker-renderer.component';
import { GkdTickerComponent } from './gkd-ticker/gkd-ticker.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [GkdTickerRendererComponent, GkdTickerComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[GkdTickerRendererComponent]
})
export class GkdTickerRendererModule { }
