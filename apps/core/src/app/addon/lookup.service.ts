import { Compiler, Injectable, Injector, NgModuleFactory, NgModuleRef, Type } from "@angular/core";
import { SafeAny } from "@comen/common";
import { AddonService } from "./addon.service";
import { BuiltinOverlayModule, BuiltinSourceModule } from "./definations";

type LazyLoadStaticCallback = () => Promise<NgModuleFactory<any> | Type<any>>

@Injectable()
export class LookupService {

    constructor(
        private addon: AddonService,
        private injector: Injector,
        private compiler: Compiler) { }

    /** onload: fetch addon info from server */

    getOverlays() {

    }

    getSources() {
        
    }

    async ensureSourceLoaded(name: string) {
        if (this.addon.isSourceExist(name)) {
            return;
        }
        switch (name) {
            case 'bilibili': {
                const module = await this.layloadNgModule<BuiltinSourceModule>(() => import('../sources/bilibili/bilibili.module').then(m => m.BilibiliSourceModule));
                this.addon.registerBuiltinSource('bilibili', module.injector.get(module.instance.source));
                return;
            }
            case 'acfun': {
                const module = await this.layloadNgModule<BuiltinSourceModule>(() => import('../sources/acfun/acfun.module').then(m => m.AcfunSourceModule));
                this.addon.registerBuiltinSource('bilibili', module.injector.get(module.instance.source));
                return;
            }
        }
        throw 'NOT IMPLEMENTED';
    }

    async ensureOverlayLoaded(name: string) {
        if (this.addon.isOverylayExist(name)) {
            return;
        }
        switch (name) {
            case 'gamma':
                const module = await this.layloadNgModule<BuiltinOverlayModule>(() => import('@comen/gamma').then(m => m.GammaModule));
                this.addon.registerBuiltinOverlay(module.instance.metadata, module.instance.entry, module.componentFactoryResolver);
                return;
        }
        throw 'NOT IMPLEMENTED';
    }

    private async layloadNgModule<T = SafeAny>(load: LazyLoadStaticCallback) {
        let ngf = await load();
        console.log('?');
        if (!(ngf instanceof NgModuleFactory)) {
            console.log('?');
            ngf = await this.compiler.compileModuleAsync(ngf);
        }
        return ngf.create(this.injector) as NgModuleRef<T>;
    }

}