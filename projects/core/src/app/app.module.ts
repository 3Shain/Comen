import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComenCoreModule } from './core/core.module';

function APPINITIAL() {

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./gamma/gamma-page.module').then(m => m.GammaPageModule)
      }
    ]),
    ComenCoreModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useValue: APPINITIAL,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
