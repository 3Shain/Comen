import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GammaModule } from '@comen/gamma';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ConditionPopoverComponent } from './config-plane/condition-popover/condition-popover.component';
import { ConditionPopoverDirective } from './config-plane/condition-popover/condition-popover.directive';
import { ConfigBlockComponent } from './config-plane/config-block/config-block.component';
import { ConfigConditionComponent } from './config-plane/config-condition/config-condition.component';
import { ConfigPlaneComponent } from './config-plane/config-plane.component';
import { ControlsModule } from './controls/controls.module';
import { EditorComponent } from './editor.component';
import { ElementTreeNodeDirective } from './element-tree/element-tree-node.directive';
import { ElementTreeComponent } from './element-tree/element-tree.component';
import { MockObsDialogModule } from './mock-obs-dialog/mock-obs-dialog.module';
import { ShadowHostComponent } from './shadow-host.component';


@NgModule({
  declarations: [EditorComponent, ShadowHostComponent,
    ElementTreeComponent, ElementTreeNodeDirective,
    ConfigBlockComponent, ConfigConditionComponent, ConfigPlaneComponent, ConditionPopoverComponent,
    ConditionPopoverDirective],
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    GammaModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzSliderModule,
    NzButtonModule,
    NzSwitchModule,
    NzDropDownModule,
    NzPopconfirmModule,
    ControlsModule,
    OverlayModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    MockObsDialogModule
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
