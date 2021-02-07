import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMMENT_CONFIGURATION, GammaModule, GammaApp } from '@comen/gamma';
import { AddonService } from '../../addon/addon.service';
import { AddonMoudle } from '../../addon/addon.module';
import { OverlayPage } from './overlay.page';


@NgModule({
    declarations: [OverlayPage],
    imports: [
        CommonModule,
        GammaModule,
        AddonMoudle,
        RouterModule.forChild([{
            path: '',
            component: OverlayPage
        }])
    ]
})
export class OverlayModule {
    constructor(addon: AddonService) {
        addon.registerBuiltinOverlay({
            name: 'gamma',
            displayName: 'Gamma',
            configuration: COMMENT_CONFIGURATION
        }, GammaApp);
    }
}