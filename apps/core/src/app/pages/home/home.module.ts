import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { HomePage } from './home.page';

@NgModule({
    declarations: [HomePage],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            pathMatch: 'full',
            component: HomePage
        }]),
        ReactiveFormsModule,
        ReactiveComponentModule
    ]
})
export class HomeModule {

}