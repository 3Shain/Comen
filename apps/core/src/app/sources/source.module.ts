import { NgModule } from '@angular/core';
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
export class ComenSourceModule { }