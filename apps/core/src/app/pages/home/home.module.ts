import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { HomePage } from './home.page';
import { TimeAgoPipe } from './time-ago.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [HomePage, TimeAgoPipe],
    imports: [
        CommonModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        ReactiveComponentModule,
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                component: HomePage,
            },
        ]),
        MatSliderModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule
    ],
})
export class HomeModule {}
