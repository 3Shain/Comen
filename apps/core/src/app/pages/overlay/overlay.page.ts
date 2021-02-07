import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ComenEnvironmentHost, deserializeBase64, Message,
    nextFrame, RxZone, SafeAny, TextMessage, waitUntilPageVisible
} from '@comen/common';
import { of, Subject } from 'rxjs';
import { catchError, filter, retry, takeUntil, tap } from 'rxjs/operators';
import { OverlayContainerDirective } from '../../addon/overlay-container.directive';
import { commentFilter, folder, smoother } from '../../common';
import { emojiFilter } from '../../common/emoji';
import { ComenConfiguration, DEFAULT_CONFIG, mergeQueryParameters } from '../../config';
import { MessageSource, SOURCE_PROVIDER } from '../../sources';

const BILICHAT_SYSTEM_MESSAGE = {
    FETCHING: '正在获取直播间信息...',
    CONNECTING: '正在连接到直播间...',
    CONNECTED: '成功连接到直播间!',
    ERROR: '检测到服务器断开,尝试重连中...'
}

@Component({
    selector: 'comen-overlay',
    template: `<ng-container overlay-container #container="overlayContainer"></ng-container>
    <div id="comen-configuration-data" #data></div>`,
    styles: [
        `#comen-configuration-data {
            display: none;
        }`
    ],
    viewProviders: [RxZone, {
        provide: ComenEnvironmentHost,
        useExisting: OverlayPage
    }]
})
// eslint-disable-next-line
export class OverlayPage extends ComenEnvironmentHost implements OnInit, OnDestroy {

    @ViewChild('data', { static: true }) data: ElementRef<HTMLDivElement>;
    @ViewChild('container', { static: true }) container: OverlayContainerDirective;

    private destroy$ = new Subject<void>();

    constructor(private activatedRoute: ActivatedRoute,
        @Inject(SOURCE_PROVIDER) private sources: MessageSource[],
        private rxzone: RxZone) {
        super();
    }

    get addonTarget() {
        return this.activatedRoute.snapshot.params.addon ?? 'gamma';
    }

    message$: Subject<Message> = new Subject();
    legacyConfig$: Subject<ComenConfiguration> = new Subject();

    async ngOnInit() {
        await waitUntilPageVisible();
        this.container.bootstrap(this.addonTarget);
        // init element?
        const queryParams = this.activatedRoute.snapshot.queryParams;
        // Query parameters are not expected to change. Any change is not responsed 
        // unless component is fully reconstructed.
        const injectedConfiguration = await this.initConfig();
        const globalConfig = mergeQueryParameters(queryParams, {
            ...DEFAULT_CONFIG,
            ...injectedConfiguration?.['@@general']
        });

        this.legacyConfig$.next(globalConfig);
        if ('bilichat' in globalConfig) {
            setTimeout(() => {
                // here showMessage is expected not undefined!
                this.message$.next({
                    type: 'blank'
                });
            }, 0);
        }
        this.sources.find(x => x.type == (globalConfig.platform ?? 'bilibili')).connect(globalConfig).pipe(
            filter(() => document.visibilityState == 'visible'),
            // this is important! because some filter depend on requestAnimationFrame will cause some weired behavior
            commentFilter(globalConfig),
            smoother(globalConfig),
            folder(globalConfig),
            filter((msg) => {
                if ('bilichat' in globalConfig) {
                    if (msg.type == 'system') {
                        this.message$.next({
                            type: 'text',
                            content: BILICHAT_SYSTEM_MESSAGE[msg.data.status],
                            avatar: '/assets/bilichat_icon.png',
                            usertype: 0b10,
                            username: 'BILICHAT'
                        } as TextMessage);
                    } else if (msg.type == 'sticker') {
                        // bilichat has no sticker type, downgrade to mock paid message
                        this.message$.next({
                            type: 'paid',
                            itemInfo: msg.itemInfo,
                            price: msg.price,
                            content: null,
                            avatar: msg.avatar,
                            username: msg.username,
                            platformUserId: msg.platformUserId
                        });
                        return false;
                    }
                }
                return true;
            }),
            emojiFilter(globalConfig),
            tap((msg) => {
                this.message$.next(msg);
            }),
            catchError(e => {
                if (e == 'NOT_FOUND') {
                    console.error('ADDON NOT FOUND');// TODO: Error UI
                    return of();
                }
                console.error(e);
                throw e;
            }),
            retry(), //TODO: endless retry will cause stackoverflow
            this.rxzone.subscribeOutsideAngular(),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    message() {
        return this.message$;
    }

    config(section: string) {
        if (section == '__legacy__') {
            return this.legacyConfig$;
        }
        return of({}); //temp workaround
    }

    variantPipe(section: string) {
        return of(null); //temp workaround
    }

    assetUrl(id: string) {
        return '';
    }

    async initConfig() {
        // config in css
        if ('obsstudio' in window) {
            let retryCount = 0;
            while (retryCount < 60) {
                await nextFrame();
                const ret = getComputedStyle(this.data.nativeElement, ':after').content;
                if (ret != 'none') {
                    return deserializeBase64(ret.substring(1, ret.length - 1));
                }
                retryCount++;
            }
            return {};
        }
        return {};
    }
}