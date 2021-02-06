import { APP_INITIALIZER, Injectable, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, UrlTree } from '@angular/router';
import { ComenSourceModule } from './sources/source.module';
import { AnalyticsService } from './common/analytics.service';
import { environment } from '../environments/environment';
import { AddonMoudle } from './addon/addon.module';

// eslint-disable-next-line
function APPINITIAL(ana: AnalyticsService) {
  return () => { return ana.init() };
}

function loadScript(url: string) {
  return new Promise(function (resolve, reject) {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.addEventListener('load', function () {
      resolve(script)
    }, { once: true });
    script.src = url
    head.appendChild(script)
  })
}

@Injectable()
class CompatibleRoutes implements CanActivate {
  constructor(private router: Router) { }
  async canActivate(route: ActivatedRouteSnapshot): Promise<UrlTree> {
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

@Injectable()
class DebugGuard implements CanActivate {
  async canActivate(route: ActivatedRouteSnapshot) {
    if (route.queryParamMap.has('load') && !environment.production) {
      await loadScript(route.queryParamMap.get('load'));
    }
    return true;
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
    AddonMoudle.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'comment',
        canActivate: [DebugGuard],
        loadChildren: () => import('./pages/comment/comment.module').then(m => m.CommentModule)
      },
      {
        path: 'edit',
        canActivate: [DebugGuard],
        loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule)
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
    }, CompatibleRoutes, DebugGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
