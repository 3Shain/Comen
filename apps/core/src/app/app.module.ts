import { Injectable, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, UrlTree } from '@angular/router';
import { AddonMoudle } from './addon/addon.module';
import { DebugGuard } from './addon/debug.guard';
import { AddonLazyloadGuard } from './addon/addon-lazyload.guard';


@Injectable()
class CompatibleRoutes implements CanActivate {
  constructor(private router: Router) { }
  async canActivate(route: ActivatedRouteSnapshot): Promise<UrlTree> {
    switch (route.url[0].path) {
      case 'gkd':
      case 'alpha':
        return this.router.createUrlTree(['/', 'overlay'], {
          queryParams: {
            ...route.queryParams,
            p: 'bilibili',
            bilichat: '',
            id: +route.params.id,
            o: 'gamma'
          }
        });
      case 'bilibili':
        return this.router.createUrlTree(['/', 'overlay'], {
          queryParams: {
            ...route.queryParams,
            p: 'bilibili',
            id: +route.params.id,
            o: 'gamma'
          }
        });
      case 'acfun':
        return this.router.createUrlTree(['/', 'overlay'], {
          queryParams: {
            ...route.queryParams,
            p: 'acfun',
            id: +route.params.id,
            o: 'gamma'
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
    HttpClientModule,
    AddonMoudle.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: '',
        canActivate: [DebugGuard, AddonLazyloadGuard],
        children: [
          {
            path: 'overlay',
            loadChildren: () => import('./pages/overlay/overlay.module').then(m => m.OverlayModule)
          },
          {
            path: 'edit',
            loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule)
          }
        ]
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
  providers: [CompatibleRoutes],
  bootstrap: [AppComponent]
})
export class AppModule {
}
