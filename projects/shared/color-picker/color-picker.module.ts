import { NgModule } from "@angular/core";
import { ColorChromeModule } from 'ngx-color/chrome';
import { OverlayModule } from '@angular/cdk/overlay';
import { CMColorPickerComponent } from './color-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[CMColorPickerComponent],
    imports:[
        ColorChromeModule,
        OverlayModule,
        CommonModule
    ],
    exports:[
        CMColorPickerComponent
    ]
})
export class CMColorPickerModule {

}