import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayContainerDirective } from './overlay-container.directive';
import { AddonService } from './addon.service';
import { DebugGuard } from './debug.guard';
import { LookupService } from './lookup.service';
import { AddonLazyloadResolver } from './addon-lazyload.resolve';

@NgModule({
    declarations: [OverlayContainerDirective],
    imports: [],
    exports: [OverlayContainerDirective]
})
export class AddonMoudle {
    static forRoot(): ModuleWithProviders<AddonMoudle> {
        return {
            ngModule: AddonMoudle,
            providers: [
                AddonService,
                AddonLazyloadResolver,
                DebugGuard,
                LookupService
            ]
        }
    }
}