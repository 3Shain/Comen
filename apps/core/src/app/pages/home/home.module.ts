import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HomePage } from './home.page';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
    declarations: [HomePage, TimeAgoPipe],
    imports: [
        CommonModule,
        NzGridModule,
        NzButtonModule,
        NzToolTipModule,
        NzIconModule,
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