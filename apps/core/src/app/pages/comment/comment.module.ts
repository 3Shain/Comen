import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { COMMENT_CONFIGURATION, GammaModule, GammaApp } from '@comen/gamma';
import { AddonService } from '../../addon/addon.service';
import { AddonMoudle } from '../../addon/addon.module';
import { CommentPage } from './comment.page';


@NgModule({
    declarations: [CommentPage],
    imports: [
        CommonModule,
        GammaModule,
        AddonMoudle,
        RouterModule.forChild([{
            path: '', //compatiability
            component: CommentPage
        }])
    ]
})
export class CommentModule {
    constructor(addon: AddonService) {
        addon.registerBuiltinOverlay({
            name: 'gamma',
            displayName: 'Gamma',
            configuration: COMMENT_CONFIGURATION
        }, GammaApp);
    }
}