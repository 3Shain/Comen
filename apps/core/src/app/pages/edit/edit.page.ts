import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ɵɵdirectiveInject as directiveInject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComenEnvironmentHost, ComenOverlayConfig, ComenSerializedData, Message, SafeAny } from '@comen/common';
import { EditorAssetStorage, EditorComponent, EDITOR_ASSET_STORAGE } from '@comen/editor';
import { zoomBigMotion, COMEN_ADDON_METADATA } from '@comen/editor';
import { merge, Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AddonService } from '../../addon/addon.service';
import { OverlayInfo } from '../../addon/definations';
import { ComenFile } from '../../file';
import { InMemoryStorage } from './in-memory.storage';
import { OverlayContainerComponent } from '../../addon/overlay-container.component';
import {
  serializeObjectToBase64,
  serializeObjectToBuffer,
} from '../../common/base64';
import { ngSetup, WithKairo } from '@kairo/angular';
import { injected } from 'kairo';
import { Title } from '@angular/platform-browser';

@WithKairo(() => {
  const addon = directiveInject(AddonService);
  const rr = directiveInject(ActivatedRoute);
  const inject = addon.getOverlayAddonMetadata(
    rr.snapshot.queryParams.o ?? 'null'
  ); // TODO: reasonable default selection

  return {
    [COMEN_ADDON_METADATA]: inject,
  };
})
@Component({
  selector: 'comen-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  animations: [zoomBigMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InMemoryStorage,
    {
      provide: EDITOR_ASSET_STORAGE,
      useExisting: InMemoryStorage,
    },
  ],
})
// eslint-disable-next-line
export class EditPage
  extends ngSetup(() => {
    return {
      addonMetadata: injected(COMEN_ADDON_METADATA),
    };
  })
  implements OnDestroy {
  overlayContainerElement: HTMLElement = undefined;

  @ViewChild('container', { static: true })
  container: OverlayContainerComponent;
  @ViewChild('editor', { static: true }) editor: EditorComponent;

  destroy$ = new Subject<void>();

  /* generate dialog props */

  @ViewChild('dialogTpl', { static: true }) dialogTpl: TemplateRef<SafeAny>;
  @ViewChild('mark', { static: false }) mark: ElementRef<Node>;
  closeDialog$ = new Subject<void>();


  constructor(
    private activatedRoute: ActivatedRoute,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private storage: InMemoryStorage,
    private router: Router,
    title: Title
  ) {
    super();
    title.setTitle('编辑器 - 活动 - Comen');
  }

  session: {
    file: ComenFile;
    data: SafeAny;
  } = this.activatedRoute.snapshot.data.session;
  overlayInfo: OverlayInfo = this.activatedRoute.snapshot.data.addonInfo
    .overlay!;

  ngOnInit() {
    if (this.session) {
      // load the file!
    } else {
      // window.location.pathname = '/'; // TODO this may cause panic?
      // return;
    }
    console.log(this.session);
    // const bootstraped = this.container.bootstrap(this.addonMetadata.name, this);
    // this.overlayContainerElement = bootstraped.element;
    // this.destroy$.subscribe(() => bootstraped.destroy());
    // setTimeout(() => {
    //     if (this.session.data != null) {
    //         this.editor.importWorkspace(this.session.data.workspace);
    //     }
    // }, 0);
  }

  ngAfterViewInit() {
    return this.editor
      .workspaceChange(1 * 1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe((workspaceData) => {
        console.log(workspaceData);
        this.session.file.storeData(
          {
            workspace: workspaceData,
          },
          {
            name: this.overlayInfo.name,
            version: this.overlayInfo.version,
          }
        );
        sessionStorage.setItem('modifying', this.session.file.id);
      });
  }

  ngOnDestroy() {
    this.closeDialog$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  async returnDashboard() {
    // save all shit
    this.router.navigate(['/']);
  }

  returnSession() {}

  /* generate dialog methods */
  generate() {
    const overlay = this.overlay.create({
      backdropClass: 'cdk-overlay-dark-backdrop',
      hasBackdrop: true,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });
    const tplPortal = new TemplatePortal(this.dialogTpl, this.vcr, {
      css: this.generateCss({
        config: this.editor.generateWorkspace(),
        data: [],
      }),
      url: '',
      size: [
        this.editor.adjustments.value.width,
        this.editor.adjustments.value.height,
      ],
    });
    overlay.attach(tplPortal);
    const parent = this.overlayContainerElement.parentElement;
    setTimeout(() => {
      this.mark.nativeElement.parentNode.appendChild(
        this.overlayContainerElement
      );
    }, 0);
    merge(overlay.backdropClick(), this.closeDialog$)
      .pipe(take(1))
      .subscribe(() => {
        parent.appendChild(this.overlayContainerElement);
        overlay.detach();
        overlay.dispose();
      });
  }

  generateCss(object: ComenSerializedData) {
    return `#comen-configuration-data:after {
      content: "${serializeObjectToBase64(object)}";
    }`;
  }

  async export() {
    const exportObject = {
      workspace: this.editor.exportWorkspace(),
      assets: Object.fromEntries(
        await Promise.all(
          Object.entries(this.storage.storage).map(async ([key, value]) => {
            return [
              key,
              {
                data: await value.blob?.arrayBuffer(),
                type: value.blob?.type,
                url: value.url,
              },
            ];
          })
        )
      ),
    };
    const file = new Blob([serializeObjectToBuffer(exportObject)]);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'export.cmproj';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}

export class EditorComenEnvironmentHost extends ComenEnvironmentHost {

  message(): Observable<Message> {
    return this._message;
  }
  config(section: string): any {
    return this._config[section] ?? {};
  }
  variantPipe(section: string): (context: any) => any {
    throw new Error('Method not implemented.');
  }
  assetUrl(id: string): string {
    return this.store.getUrl(id);
  }

  constructor(
    public rootElement: any,
    private _config: ComenOverlayConfig,
    private _message: Observable<Message>,
    private store: EditorAssetStorage
  ) {
    super();
  }

  dispose() {

  }
}