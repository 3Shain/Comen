import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfigBlockComponent } from './config-plane/config-block/config-block.component';
import { ConfigPlaneComponent } from './config-plane/config-plane.component';
import { ControlsModule } from './controls/controls.module';
import { EditorComponent } from './editor.component';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    EditorComponent,
    ConfigBlockComponent,
    ConfigPlaneComponent,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    OverlayModule,
    DragDropModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
    FontAwesomeModule,
    // mat controls
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatListModule,
    MatCardModule
  ],
  exports: [EditorComponent],
})
export class EditorModule {}
