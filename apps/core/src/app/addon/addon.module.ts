import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayContainerDirective } from './overlay-container.directive';
import { AddonService } from './addon.service';
import { AddonLazyloadGuard } from './addon-lazyload.guard';
import { DebugGuard } from './debug.guard';
import { LookupService } from './lookup.service';

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
                AddonLazyloadGuard,
                DebugGuard,
                LookupService
            ]
        }
    }
}