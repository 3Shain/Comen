import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, Inject, Injector, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComenAddonConfiguration, ComenEnvironmentHost, SafeAny, serializeObject } from '@comen/common';
import { merge, Subject } from 'rxjs';
import { debounceTime, startWith, take } from 'rxjs/operators';
import { EditorEnvironmentHost } from './editor.host';
import { generateCode } from './variant/compiler';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation'

@Component({
  selector: 'comen-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [{
    provide: ComenEnvironmentHost,
    useClass: EditorEnvironmentHost
  }],
  animations: [zoomBigMotion]
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
  closeDialog$ = new Subject<void>();

  @ViewChild('dialogTpl') dialogTpl: TemplateRef<SafeAny>;
  @ViewChild('mark', { static: false }) mark: ElementRef<Node>;
  @Input() configuration: ComenAddonConfiguration;
  @Input() elementView: HTMLElement = undefined;

  get currentConfigSectionIn() {
    return this.configuration.sections[this.currentConfigSection];
  }

  constructor(private injector: Injector,
    private fb: FormBuilder,
    @Inject(ComenEnvironmentHost) private host: EditorEnvironmentHost,
    private overlay: Overlay,
    private vcr: ViewContainerRef) {

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

  ngOnDestroy() {
    this.closeDialog$.complete();
  }

  generate() {
    const overlay = this.overlay.create({
      backdropClass: 'cdk-overlay-dark-backdrop',
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
    const tplPortal = new TemplatePortal(this.dialogTpl, this.vcr, {
      css: this.generateCss(this.formGroup.value),
      url: "",
      size: [this.adjustments.value.width, this.adjustments.value.height]
    });
    overlay.attach(tplPortal);
    const sib = document.createElement("div");
    this.elementView.getRootNode().appendChild(sib);
    setTimeout(() => {
      // console.log(this.mark.nativeElement.parentNode);
      this.mark.nativeElement.parentNode.appendChild(this.elementView);
    }, 0);
    merge(overlay.backdropClick(), this.closeDialog$).pipe(take(1)).subscribe(() => {
      sib.getRootNode().appendChild(this.elementView);
      sib.remove();
      overlay.detach();
      overlay.dispose();
    });
  }

  onTreeHover(selector: string) {
    clearMasks();
    if (selector != null && this.elementView) {
      this.elementView.querySelectorAll(selector).forEach(_ => {
        createMask(_);
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

  generateCss(object) {
    return `#comen-configuration-data:after {
      content: "${serializeObject(object)}";
    }`;
  }

}

function createMask(target: Element) {
  const rect = target.getBoundingClientRect();
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