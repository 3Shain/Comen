import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexLocalRoutingModule } from './index-local-routing.module';
import { IndexLocalComponent } from './index-local.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [IndexLocalComponent],
  imports: [
    CommonModule,
    IndexLocalRoutingModule,
    TranslateModule.forChild()
  ]
})
export class IndexLocalModule { }
