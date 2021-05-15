import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ComenAddonConfiguration, ComenEnvironmentHost, SafeAny } from '@comen/common';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { combineLatest, merge } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { EditorEnvironmentHost } from './editor.host';
import { generateCode } from './variant/compiler';


@Component({
  selector: 'comen-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [{
    provide: ComenEnvironmentHost,
    useClass: EditorEnvironmentHost
  }],
  exportAs: 'editor'
})
export class EditorComponent implements OnInit, AfterViewInit {

  currentConfigSection = '';
  formGroup: FormGroup;
  mockControl = this.fb.control(null);
  adjustments = this.fb.group({
    width: [600],
    height: [800],
    background: ['#666666'],
    grid: [false]
  });

  @Input() configuration: ComenAddonConfiguration;
  @Input() elementView: HTMLElement = undefined;

  get currentConfigSectionIn() {
    return this.configuration.sections[this.currentConfigSection];
  }

  sHeight = 700;
  sEvent = -1;

  constructor(private fb: FormBuilder,
    @Inject(ComenEnvironmentHost) private host: EditorEnvironmentHost) {

  }

  onResize({ height }: NzResizeEvent) {
    cancelAnimationFrame(this.sEvent);
    this.sEvent = requestAnimationFrame(() => {
      this.sHeight = height;
    });
  }

  ngOnInit() {
    this.currentConfigSection = Object.keys(this.configuration.sections)[0]; // TODO: make sure length > 0
    this.formGroup = this.fb.group(
      Object.fromEntries(
        Object.entries(this.configuration.sections).map(([key, section]) => {
          return [key, {
            default: section.defaultValue,
            variants: []
          }];
        }))
    );
    Object.entries(
      this.formGroup.controls).forEach(([section, control]) => {
        control.valueChanges.pipe(
          debounceTime(0), // NB: avoid repeating singal in one eventloop execution
        ).subscribe((val) => {
          this.host.emitConfig(section, val.default);
          this.host.emitVariantPipe(section, new Function('c', generateCode(val)))
        });
      });
  }

  ngAfterViewInit() {

  }

  onTreeHover(selector: string) {
    clearMasks();
    if (selector != null && this.elementView) {
      const viewport = this.elementView.getBoundingClientRect();
      this.elementView.querySelectorAll(selector).forEach(_ => {
        createMask(_, viewport);
      });
    }
  }

  onTreeLeave() {
    clearMasks();
  }

  onSectionClick(section: string) {
    if (section != this.currentConfigSection) {
      this.currentConfigSection = section;
    }
  }

  importWorkspace(workspace: EditorWorkspace) {
    this.adjustments.patchValue(workspace.adjustments, { emitEvent: false });
    this.formGroup.patchValue(workspace.values, { emitEvent: false });
    this.mockControl.patchValue(workspace.mocks, { emitEvent: false });
    Object.entries(
      this.formGroup.controls).forEach(([section, control]) => {
        this.host.emitConfig(section, control.value.default);
        this.host.emitVariantPipe(section, new Function('c', generateCode(control.value)))
      });
  }

  exportWorkspace() {
    return {
      values: this.formGroup.value,
      mocks: this.mockControl.value,
      adjustments: this.adjustments.value
    } as EditorWorkspace;
  }

  generateWorkspace(): SafeAny {
    return Object.fromEntries(Object.entries(this.formGroup.value).map(([key, value]: [string, SafeAny]) => {
      if (this.configuration.sections[key].variantProperties) {
        return [key, {
          default: value.default,
          variantsPipe: generateCode(value)
        }]
      } else {
        return [key, {
          default: value.default
        }]
      }
    }))
  }

  workspaceChange(_debounceTime: number = 0) {
    return merge(
      this.adjustments.valueChanges,
      this.formGroup.valueChanges,
      this.mockControl.valueChanges
    ).pipe(
      map(() => {
        console.log('t');
        return this.exportWorkspace();
      }),
      debounceTime(_debounceTime)
    );
  }
}

export interface EditorWorkspace {
  adjustments: {
    width: string;
    height: string;
  };
  mocks: {

  };
  values: SafeAny;
}

function createMask(target: Element, viewport: DOMRect) {
  const rect = target.getBoundingClientRect();
  if (rect.top < viewport.top || rect.bottom > viewport.bottom) {
    return;
  }
  const hObj = document.createElement('div');
  hObj.className = 'highlight-wrap';
  hObj.style.position = 'absolute';
  hObj.style.top = rect.top + 'px';
  hObj.style.width = rect.width + 'px';
  hObj.style.height = rect.height + 'px';
  hObj.style.left = rect.left + 'px';
  hObj.style.backgroundColor = '#a0c5e8';
  hObj.style.opacity = '0.5';
  hObj.style.cursor = 'default';
  hObj.style.pointerEvents = 'none';
  //hObj.style.WebkitTransition='top 0.2s';
  document.body.appendChild(hObj);
}

function clearMasks() {
  const hwrappersLength = document.getElementsByClassName('highlight-wrap').length;
  const hwrappers = document.getElementsByClassName('highlight-wrap');
  if (hwrappersLength > 0) {
    for (let i = hwrappersLength - 1; i >= 0; i--) {
      hwrappers[i].remove();
    }
  }
}