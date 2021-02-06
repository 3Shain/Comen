import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ReactiveComponentModule } from "@ngrx/component";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSliderModule } from "ng-zorro-antd/slider";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { ColorChromeModule } from "ngx-color/chrome";
import { ColorControlComponent } from "./color-control/color-control.component";
import { FontControlComponent } from "./font-control/font-control.component";
import { MarginControlComponent } from "./margin-control/margin-control.component";
import { RangeControlComponent } from './range-control/range-control.component';
import { OutlineControlComponent } from './outline-control/outline-control.component';
import { BorderControlComponent } from './border-control/border-control.component';
import { RadiusControlComponent } from './radius-control/radius-control.component';
import { BackgroundControlComponent } from './background-control/background-control.component';
import { DisplayControlComponent } from './display-control/display-control.component';
import { ShadowControlComponent } from './shadow-control/shadow-control.component';

@NgModule({
    declarations: [
        ColorControlComponent,
        MarginControlComponent,
        FontControlComponent,
        RangeControlComponent,
        OutlineControlComponent,
        BorderControlComponent,
        RadiusControlComponent,
        BackgroundControlComponent,
        DisplayControlComponent,
        ShadowControlComponent
    ],
    imports: [
        ReactiveComponentModule,
        ReactiveFormsModule,
        NzInputNumberModule,
        NzRadioModule,
        NzGridModule,
        NzSelectModule,
        NzIconModule,
        NzSliderModule,
        NzCheckboxModule,
        NzSwitchModule,
        CommonModule,
        ColorChromeModule,
    ],
    exports: [
        ColorControlComponent,
        MarginControlComponent,
        FontControlComponent,
        RangeControlComponent,
        OutlineControlComponent,
        BorderControlComponent,
        RadiusControlComponent,
        BackgroundControlComponent,
        DisplayControlComponent,
        ShadowControlComponent
    ]
})
export class ControlsModule {

}