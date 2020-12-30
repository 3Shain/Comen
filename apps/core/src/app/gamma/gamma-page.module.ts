import { CommonModule } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GammaModule } from '@comen/gamma';
import { PlatformPage } from './platform.page';

@Injectable()
class CompatibleRoutes implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree {
        switch (route.url[0].path) {
            case "gkd":
            case "alpha":
            case "bilibili":
                return this.router.createUrlTree(['/', 'platform'], {
                    queryParams: {
                        ...route.queryParams,
                        p: 'bilibili',
                        id: +route.params.id
                    }
                });
        }
        throw new Error('NOT EXPECTED ROUTE');
    }

}

@NgModule({
    declarations: [PlatformPage],
    imports: [
        CommonModule,
        GammaModule,
        RouterModule.forChild([{
            path: 'platform', //compatiability
            component: PlatformPage
        },
        /** (bilichat) compatible routes  */
        {
            path: 'gkd/:id',
            canActivate: [CompatibleRoutes]
        }, {
            path: 'alpha/:id',
            canActivate: [CompatibleRoutes]
        }, {
            path: 'bilibili/:id',
            canActivate: [CompatibleRoutes]
        }])
    ],
    providers: [
        CompatibleRoutes
    ]
})
export class GammaPageModule {
}