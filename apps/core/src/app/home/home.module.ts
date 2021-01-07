import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ReactiveComponentModule } from '@ngrx/component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        ReactiveComponentModule,
        ReactiveFormsModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: HomePage
        }])
    ]
})
export class HomeModule {

}