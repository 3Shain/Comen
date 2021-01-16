import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GammaModule } from '@comen/gamma';
import { CommentPage } from './comment.page';


@NgModule({
    declarations: [CommentPage],
    imports: [
        CommonModule,
        GammaModule,
        RouterModule.forChild([{
            path: '', //compatiability
            component: CommentPage
        }])
    ]
})
export class CommentModule {
}