import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
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
import { ElementTreeNodeDirective } from './element-tree-plane/element-tree-node.directive';
import { ElementTreePlaneComponent } from './element-tree-plane/element-tree-plane.component';
import { MockMessagePlaneComponent } from './mock-message-plane/mock-message-plane.component';


@NgModule({
  declarations: [EditorComponent,
    ElementTreePlaneComponent, ElementTreeNodeDirective,
    ConfigBlockComponent, ConfigConditionComponent, ConfigPlaneComponent, ConditionPopoverComponent,
    ConditionPopoverDirective,
    MockMessagePlaneComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzIconModule,
    NzSelectModule,
    NzGridModule,
    NzInputModule,
    NzInputNumberModule,
    NzSliderModule,
    NzButtonModule,
    NzSwitchModule,
    NzDropDownModule,
    NzPopconfirmModule,
    NzResizableModule,
    ControlsModule,
    OverlayModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  exports: [EditorComponent]
})
export class EditorModule { }
