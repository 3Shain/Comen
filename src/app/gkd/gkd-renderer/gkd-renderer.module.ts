import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GKDMessageComponent } from './gkd-message/message.component';
import { GKDLegacyPaidMessageComponent } from './gkd-paid-message/paid-message.component';
import { GKDRendererComponent } from './gkd-renderer.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GKDRendererComponent,
    GKDMessageComponent,
    GKDLegacyPaidMessageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    GKDRendererComponent,
    GKDMessageComponent,
    GKDLegacyPaidMessageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GkdRendererModule { }
