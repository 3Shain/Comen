import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@comen/editor';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddonMoudle } from '../../addon/addon.module';
import { EditPage } from './edit.page';
import { MockObsDialogModule } from './mock-obs-dialog/mock-obs-dialog.module';
import { ShadowHostComponent } from './shadow-host.component';


@NgModule({
    declarations: [EditPage, ShadowHostComponent],
    imports: [
        EditorModule,
        RouterModule.forChild([{
            path: '',
            component: EditPage
        }]),
        AddonMoudle,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        NzSelectModule,
        NzGridModule,
        MockObsDialogModule
    ]
})
export class EditModule { }