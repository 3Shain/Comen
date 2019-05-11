import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { readFileSync } from 'fs';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


export function universalLoader(): TranslateLoader {
  return {
      getTranslation: (lang: string) => {
          return new Observable((observer: Observer<any>) => {
              observer.next(JSON.parse(readFileSync(`./dist/browser/assets/i18n/${lang}.json`, 'utf8')));
              observer.complete();
          });
      }
  } as TranslateLoader;
}



@NgModule({
  bootstrap: [AppComponent],
  imports: [
      BrowserModule.withServerTransition({appId: 'app-root'}),
      AppModule,
      ServerModule,
      NoopAnimationsModule,
      ModuleMapLoaderModule,
      ServerTransferStateModule,
      TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useFactory: universalLoader}
      })
  ]
})
export class AppServerModule {}
