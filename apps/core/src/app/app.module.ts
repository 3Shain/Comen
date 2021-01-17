import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, UrlTree } from '@angular/router';
import { ComenSourceModule } from './sources/source.module';
import { AnalyticsService } from './common/analytics.service';

// eslint-disable-next-line
function APPINITIAL(ana: AnalyticsService) {
  return () => { return ana.init() };
}

@Injectable()
class CompatibleRoutes implements CanActivate {
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): UrlTree {
    switch (route.url[0].path) {
      case 'gkd':
      case 'alpha':
        return this.router.createUrlTree(['/', 'comment'], {
          queryParams: {
            ...route.queryParams,
            p: 'bilibili',
            bilichat: '',
            id: +route.params.id
          }
        });
      case 'bilibili':
        return this.router.createUrlTree(['/', 'comment'], {
          queryParams: {
            ...route.queryParams,
            p: 'bilibili',
            id: +route.params.id
          }
        });
      case 'acfun':
        return this.router.createUrlTree(['/', 'comment'], {
          queryParams: {
            ...route.queryParams,
            p: 'acfun',
            id: +route.params.id
          }
        });
    }
    throw new Error('NOT EXPECTED ROUTE');
  }

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ComenSourceModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'comment',
        loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentModule)
      },
      /** (bilichat) compatible routes  */
      {
        path: 'gkd/:id',
        canActivate: [CompatibleRoutes],
        children: []
      }, {
        path: 'alpha/:id',
        canActivate: [CompatibleRoutes],
        children: []
      }, {
        path: 'bilibili/:id',
        canActivate: [CompatibleRoutes],
        children: []
      }, {
        path: 'acfun/:id',
        canActivate: [CompatibleRoutes],
        children: []
      }
    ])
  ],
  providers: [AnalyticsService,
    {
      provide: APP_INITIALIZER,
      useFactory: APPINITIAL,
      multi: true,
      deps: [AnalyticsService]
    }, CompatibleRoutes],
  bootstrap: [AppComponent]
})
export class AppModule { }
