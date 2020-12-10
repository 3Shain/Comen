import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { GammaModule } from 'shared/gamma/gamma.module';
import { AcfunPage } from './acfun.page';
import { BilibiliPage } from './bilibili.page';

/**
 * 关于BilibiliPage与AcfunPage的逻辑复用
 * 3shain: 确实有很大部分代码是相同的，后续会合并成一个组件。
 */
@NgModule({
    declarations: [BilibiliPage, AcfunPage],
    imports: [
        CommonModule,
        GammaModule,
        RouterModule.forChild([{
            path: 'bilibili/:id',
            component: BilibiliPage
        }, {
            path: 'acfun/:id',
            component: AcfunPage
        }, {
            path: 'gdk/:id', //compatiability
            redirectTo: 'bilibili'
        }, {
            path: 'alpha/:id', //compatiability
            redirectTo: 'bilibili'
        }])
    ]
})
export class GammaPageModule {

}