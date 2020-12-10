import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { GammaModule } from 'shared/gamma/gamma.module';
import { GammaPage } from './gamma.page';

@NgModule({
    declarations: [GammaPage],
    imports: [
        CommonModule,
        GammaModule,
        RouterModule.forChild([{
            path: 'gamma/:id',
            component: GammaPage
        }, {
            path: 'gdk/:id', //compatiability
            redirectTo: 'gamma'
        }, {
            path: 'alpha/:id', //compatiability
            redirectTo: 'gamma'
        }])
    ]
})
export class GammaPageModule {

}