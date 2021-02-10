import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComenAddonConfiguration, ComenEnvironmentHost, SafeAny } from '@comen/common';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { debounceTime } from 'rxjs/operators';
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
  adjustments = this.fb.group({
    width: [600],
    height: [800],
    background: ['#444'],
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
        Object.entries(this.configuration.sections).map(([key, sections]) => {
          return [key, {
            default: Object.fromEntries(Object.entries(sections.properties).filter(([propkey, property]) => {
              return property.defaultVisible;
            }).map(([propkey, property]) => {
              return [propkey, property.defaultValue]
            })),
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
          this.host.emitVariantPipe(section, generateCode(val))
        });
      });
  }

  ngAfterViewInit() {
    this.host.emitMessage({
      type: 'text',
      content: 'Test',
      username: 'DEBUG',
      avatar: '/assets/logo_solid.png',
      badges: [],
      usertype: 0,
      platformUserId: 0,
      platformUserLevel: 0,
      platformUserExtra: {}
    })
    this.host.emitMessage({
      type: 'paid',
      content: 'Test',
      username: 'DEBUG',
      avatar: '/assets/logo_solid.png',
      itemInfo: '$100',
      price: 100,
      platformUserId: 0,
    })
    this.host.emitMessage({
      type: 'text',
      content: 'Test',
      username: 'DEBUG',
      avatar: '/assets/logo_solid.png',
      badges: [],
      usertype: 0,
      platformUserId: 0,
      platformUserLevel: 0,
      platformUserExtra: {}
    })
  }

  onTreeHover(selector: string) {
    clearMasks();
    if (selector != null && this.elementView) {
      const viewport = this.elementView.getBoundingClientRect();
      this.elementView.querySelectorAll(selector).forEach(_ => {
        createMask(_,viewport);
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

  }

  exportWorkspace() {

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

function createMask(target: Element,viewport:DOMRect) {
  const rect = target.getBoundingClientRect();
  if(rect.top<viewport.top||rect.bottom>viewport.bottom){
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