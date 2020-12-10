import { NgModule } from "@angular/core";
import { AcfunSource } from './acfun';
import { BilibiliSource } from './bilibili';
import { SOURCE_PROVIDER } from './source';

//feature module 
@NgModule({
    providers: [
        {
            provide: SOURCE_PROVIDER,
            multi: true,
            useClass: BilibiliSource
        }, {
            provide: SOURCE_PROVIDER,
            multi: true,
            useClass: AcfunSource
        }
    ]
})
// disclaimer: 叫core的怎么这么多。。。
export class ComenCoreModule {

}