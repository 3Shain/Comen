import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ComenCoreModule } from './core/core.module';

// eslint-disable-next-line
function APPINITIAL() {

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ComenCoreModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: '',
        loadChildren: () => import('./gamma/gamma-page.module').then(m => m.GammaPageModule)
      }
    ])
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useValue: APPINITIAL,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
