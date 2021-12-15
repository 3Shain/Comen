import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class RedirectGuard implements CanActivate {
  constructor(private router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot): Promise<UrlTree | boolean> {
    if (COMEN_ENVIRONMENT === 'vercel'||!environment.production) {
      return true;
    }
    return this.router.createUrlTree(['/', 'edit'], {
      queryParams: {
        o: 'gamma', // FIXME:
      },
    });
  }
}
