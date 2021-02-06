import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@comen/editor';
import { COMMENT_CONFIGURATION, GammaApp } from '@comen/gamma';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddonMoudle } from '../../addon/addon.module';
import { AddonService } from '../../addon/addon.service';
import { EditPage } from './edit.page';


@NgModule({
    declarations: [EditPage],
    imports: [
        EditorModule,
        RouterModule.forChild([{
            path: '',
            component: EditPage
        }]),
        AddonMoudle,
        NzButtonModule,
        NzIconModule
    ]
})
export class EditModule {
    constructor(addon: AddonService) {
        addon.registerBuiltinOverlay({
            name: 'gamma',
            displayName: 'Gamma',
            configuration: COMMENT_CONFIGURATION
        }, GammaApp);
    }
}