import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { LookupService } from "./lookup.service";

@Injectable()
export class AddonLazyloadGuard implements CanActivate {

    constructor(
        private lookup: LookupService
    ) { }

    async canActivate(snapshot: ActivatedRouteSnapshot) {
        if (snapshot.queryParams.o!=undefined) {
            await this.lookup.ensureOverlayLoaded(snapshot.queryParams.o);
        }
        if (snapshot.queryParams.p!=undefined) {
            await this.lookup.ensureSourceLoaded(snapshot.queryParams.p);
        }
        return true;
    }
}