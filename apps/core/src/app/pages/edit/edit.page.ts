import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComenAddonConfiguration, Message, SafeAny, serializeObjectToBase64, serializeObjectToBuffer } from '@comen/common';
import { EditorComponent, EditorRealtimeMessageProvider, EDITOR_ASSET_STORAGE, EDITOR_REALTIME_MESSAGE_PROVIDER } from '@comen/editor';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { defer, merge, Observable, of, Subject } from 'rxjs';
import { publish, refCount, shareReplay, switchMap, take, takeUntil } from 'rxjs/operators';
import { AddonService } from '../../addon/addon.service';
import { OverlayInfo, SourceInfo } from '../../addon/definations';
import { LookupService } from '../../addon/lookup.service';
import { OverlayContainerDirective } from '../../addon/overlay-container.directive';
import { ComenFile } from '../../file';
import { InMemoryStorage } from './in-memory.storage';

@Component({
    selector: 'comen-edit',
    templateUrl: './edit.page.html',
    styleUrls: [
        './edit.page.scss'
    ],
    animations: [zoomBigMotion],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: EDITOR_REALTIME_MESSAGE_PROVIDER,
            useExisting: EditPage
        },
        InMemoryStorage,
        {
            provide: EDITOR_ASSET_STORAGE,
            useExisting: InMemoryStorage
        }
    ]
})
// eslint-disable-next-line
export class EditPage implements OnInit, OnDestroy, EditorRealtimeMessageProvider {

    configuration: ComenAddonConfiguration;
    view: Node = undefined;

    @ViewChild('container', { static: true }) container: OverlayContainerDirective;
    @ViewChild('editor', { static: true }) editor: EditorComponent;

    destroy$ = new Subject<void>();

    /* generate dialog props */

    @ViewChild('dialogTpl', { static: true }) dialogTpl: TemplateRef<SafeAny>;
    @ViewChild('mark', { static: false }) mark: ElementRef<Node>;
    closeDialog$ = new Subject<void>();

    /* connect dialog props */
    @ViewChild('connectDialogTpl', { static: true }) connectDialogTpl: TemplateRef<SafeAny>;
    confirmDialog$ = new Subject<SafeAny>();
    source$ = defer(() => this.lookup.getSources()).pipe(
        shareReplay(1)
    ) as Observable<SourceInfo[]>;

    get addonTarget() {
        return this.addon.getOverlayAddonMetadata(this.activatedRoute.snapshot.queryParams.o ?? "null");
    }

    constructor(private activatedRoute: ActivatedRoute,
        private overlay: Overlay,
        private vcr: ViewContainerRef,
        private addon: AddonService,
        private lookup: LookupService,
        private storage: InMemoryStorage,
        private router: Router,) {
        const inject = this.addonTarget.configuration; // TODO: reasonable default selection
        this.configuration = {
            displayName: inject.displayName,
            preset: inject.preset,
            sections: {
                '@@global': {
                    displayName: '基本设置',
                    level: 0,
                    'x-icon': 'setting',
                    properties: {
                        disableSmoother: {
                            displayName: '关闭消息平滑',
                            type: 'switch',
                            defaultValue: false
                        },
                        disableAvatarPreload: {
                            displayName: '关闭头像预加载',
                            type: 'switch',
                            defaultValue: false
                        },
                        showGiftAutoDanmaku: {
                            displayName: '显示礼物自动触发弹幕',
                            type: 'switch',
                            defaultValue: false
                        },
                        maxDanmakuNumber: {
                            displayName: '最大弹幕同时渲染数量',
                            type: 'number',
                            defaultValue: 50
                        },
                        // "groupSimilar": {
                        //     displayName: "合并相似弹幕",
                        //     type: "switch",
                        //     defaultValue: true
                        // }
                    }
                },
                ...inject.sections
            }
        }
    }

    session: {
        file: ComenFile,
        data: SafeAny
    } = this.activatedRoute.snapshot.data.session;
    overlayInfo: OverlayInfo = this.activatedRoute.snapshot.data.addonInfo.overlay!;

    ngOnInit() {
        if (this.session) {
            // load the file!
        } else {
            window.location.pathname = '/'; // TODO this may cause panic?
        }
        this.view = this.container.bootstrap(this.addonTarget.name);
    }

    ngAfterViewInit() {
        return this.editor.workspaceChange(10 * 1000).pipe(
            takeUntil(this.destroy$)
        ).subscribe(workspaceData => {
            this.session.file.storeData(workspaceData, {
                name: this.overlayInfo.name,
                version: this.overlayInfo.version
            });
            sessionStorage.setItem("modifying", this.session.file.id)
        });
    }

    ngOnDestroy() {
        this.closeDialog$.complete();
        this.destroy$.next();
        this.destroy$.complete();
    }

    async returnDashboard() {
        // save all shit
        sessionStorage.removeItem("modifying");
        this.router.navigate(['/']);
    }

    /* generate dialog methods */
    generate() {
        const overlay = this.overlay.create({
            backdropClass: 'cdk-overlay-dark-backdrop',
            hasBackdrop: true,
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
        });
        const tplPortal = new TemplatePortal(this.dialogTpl, this.vcr, {
            css: this.generateCss(this.editor.formGroup.value), // TODO: not very neat
            url: '',
            size: [this.editor.adjustments.value.width, this.editor.adjustments.value.height]
        });
        overlay.attach(tplPortal);
        const sib = document.createElement('div');
        this.view.getRootNode().appendChild(sib);
        setTimeout(() => {
            // console.log(this.mark.nativeElement.parentNode);
            this.mark.nativeElement.parentNode.appendChild(this.view);
        }, 0);
        merge(overlay.backdropClick(), this.closeDialog$).pipe(take(1)).subscribe(() => {
            sib.getRootNode().appendChild(this.view);
            sib.remove();
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

    connect(options: {
        target: Element
    }): any {
        const overlay = this.overlay.create({
            backdropClass: 'cdk-overlay-transparent-backdrop',
            hasBackdrop: true,
            positionStrategy: this.overlay.position().flexibleConnectedTo(options.target).withPositions([{
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: 0
            }])
        });
        const tplPortal = new TemplatePortal(this.connectDialogTpl, this.vcr, {});
        const ref = overlay.attach(tplPortal);
        return this.confirmDialog$.pipe(
            take(1),
            switchMap(s => {
                ref.detach();
                ref.destroy();
                overlay.detach();
                overlay.dispose();
                if (s == null) {
                    return of();
                }
                console.log(s);
                return defer(() => this.lookup.ensureSourceLoaded(s.source)).pipe(
                    switchMap(() => {
                        return this.addon.connectSource(s.source, {
                            roomId: s.channel
                        });
                    })
                )
            })
        );
    }

    /* some */
    async export() {
        const exportObject = {
            workspace: this.editor.exportWorkspace(),
            assets: Object.fromEntries(await Promise.all(Object.entries(this.storage.storage).map(async ([key, value]) => {
                return [key, {
                    data: await value.blob?.arrayBuffer(),
                    type: value.blob?.type,
                    url: value.url
                }]
            })))
        }
        const file = new Blob([serializeObjectToBuffer(exportObject)]);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = 'export.cmproj';
        a.click();
        URL.revokeObjectURL(a.href);
    }
}