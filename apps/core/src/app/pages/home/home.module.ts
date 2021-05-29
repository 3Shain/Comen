import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { HomePage } from './home.page';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
    declarations: [HomePage, TimeAgoPipe],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ReactiveComponentModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: HomePage
        }])
    ]
})
export class HomeModule {

}