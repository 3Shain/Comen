import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ɵɵdirectiveInject as directiveInject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComenAddonConfiguration, Message, SafeAny } from '@comen/common';
import {
  EditorComponent,
  EditorRealtimeMessageProvider,
  EDITOR_ASSET_STORAGE,
  EDITOR_REALTIME_MESSAGE_PROVIDER,
} from '@comen/editor';
import { zoomBigMotion, COMEN_ADDON_METADATA } from '@comen/editor';
import { defer, merge, Observable, of, Subject } from 'rxjs';
import { shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';
import { AddonService } from '../../addon/addon.service';
import { OverlayInfo, SourceInfo } from '../../addon/definations';
import { LookupService } from '../../addon/lookup.service';
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
    {
      provide: EDITOR_REALTIME_MESSAGE_PROVIDER,
      useExisting: EditPage,
    },
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
  implements OnDestroy, EditorRealtimeMessageProvider {
  overlayContainerElement: HTMLElement = undefined;

  @ViewChild('container', { static: true })
  container: OverlayContainerComponent;
  @ViewChild('editor', { static: true }) editor: EditorComponent;

  destroy$ = new Subject<void>();

  /* generate dialog props */

  @ViewChild('dialogTpl', { static: true }) dialogTpl: TemplateRef<SafeAny>;
  @ViewChild('mark', { static: false }) mark: ElementRef<Node>;
  closeDialog$ = new Subject<void>();

  source$ = defer(() => this.lookup.getSources()).pipe(
    shareReplay(1)
  ) as Observable<SourceInfo[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private addon: AddonService,
    private lookup: LookupService,
    private storage: InMemoryStorage,
    private router: Router,
    private title: Title
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
    const bootstraped = this.container.bootstrap(this.addonMetadata.name);
    this.overlayContainerElement = bootstraped.element;
    this.destroy$.subscribe(() => bootstraped.destroy());
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
        data: {},
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

  generateCss(object) {
    return `#comen-configuration-data:after {
      content: "${serializeObjectToBase64(object)}";
    }`;
  }

  /* connect dialog methods */

  connect(s: any): any {
    console.log('doing something');
    return defer(() => this.lookup.ensureSourceLoaded(s.source)).pipe(
      switchMap(() => {
        return this.addon.connectSource(s.source, {
          roomId: s.channel,
        });
      })
    );
  }

  /* some */
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
