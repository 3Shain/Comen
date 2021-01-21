import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { catchError, filter, map, retry, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GammaConfiguration, MessageProvider, MESSAGE_PROVIDER } from '@comen/gamma';
import { waitUntilVisible, TextMessage, Message, RxZone } from '@comen/common';
import { MessageSource, SOURCE_PROVIDER } from '../../sources';
import { commentFilter, folder, smoother } from '../../common';
import { ComenConfiguration, CSSINJECT_CONFIG_TOKEN, mergeQueryParameters, parseConfiguration, DEFAULT_CONFIG } from '../../config';
import { AnalyticsService } from '../../common/analytics.service';
import { emojiFilter } from '../../common/emoji';

const BILICHAT_SYSTEM_MESSAGE = {
    FETCHING: '正在获取直播间信息...',
    CONNECTING: '正在连接到直播间...',
    CONNECTED: '成功连接到直播间!',
    ERROR: '检测到服务器断开,尝试重连中...'
}

@Component({
    selector: 'comen-comment',
    template: `<yt-live-chat-app></yt-live-chat-app>`,
    viewProviders: [{
        provide: MESSAGE_PROVIDER,
        useExisting: CommentPage
    },RxZone]
})
// eslint-disable-next-line
export class CommentPage implements MessageProvider, OnDestroy, AfterViewInit {

    private showMessage?: (msg: Message) => unknown;
    private configureGamma?: (config: GammaConfiguration) => unknown;
    private destroy$: Subject<void> = new Subject();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    registerOnMessage(fnMsg: (msg: Message) => unknown) {
        this.showMessage = fnMsg;
    }

    registerOnConfiguration(fn: any) {
        this.configureGamma = fn;
    }

    constructor(
        private activatedRoute: ActivatedRoute,
        @Inject(SOURCE_PROVIDER) private sources: MessageSource[],
        @Inject(CSSINJECT_CONFIG_TOKEN) private config$: Subject<string>,
        private analytic: AnalyticsService,
        private rxzone: RxZone
    ) { }

    ngAfterViewInit() {
        combineLatest([this.activatedRoute.queryParams, this.config$]).pipe(
            waitUntilVisible(), // actully not expect to be executed twice!
            map(([query, data]) => {
                return mergeQueryParameters(query,
                    parseConfiguration<ComenConfiguration>(data, DEFAULT_CONFIG))
            }),
            tap((config) => {
                if (config.disableAnalytics) {
                    this.analytic.disabled = true;
                    this.analytic.on = false;
                }
                this.configureGamma(config as any);
                if ('bilichat' in config) {
                    setTimeout(() => {
                        // here showMessage is expected not undefined!
                        this.showMessage({
                            type: 'blank'
                        });
                    }, 0);
                    this.analytic.event('Comen Compat', { roomid: config.roomId, platform: config.platform });
                } else {
                    this.analytic.event('Comen Usage', { roomid: config.roomId, platform: config.platform });
                }
            }),
            switchMap((config) => {
                // TODO: safe check : does plaform exist
                return this.sources.find(x => x.type == (config.platform ?? 'bilibili')).connect(config).pipe(
                    filter(() => document.visibilityState == 'visible'),
                    // this is important! because some filter depend on requestAnimationFrame will cause some weired behavior
                    commentFilter(config),
                    smoother(config),
                    folder(config),
                    filter((msg) => {
                        if ('bilichat' in config) {
                            if (msg.type == 'system') {
                                this.showMessage({
                                    type: 'text',
                                    content: BILICHAT_SYSTEM_MESSAGE[msg.data.status],
                                    avatar: '/assets/bilichat_icon.png',
                                    usertype: 0b10,
                                    username: 'BILICHAT'
                                } as TextMessage);
                            } else if (msg.type == 'sticker') {
                                // bilichat has no sticker type, downgrade to mock paid message
                                this.showMessage({
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
                    emojiFilter(config),
                    tap((msg) => {
                        console.log(msg);
                        if (msg.type == 'livestart') {
                            this.analytic.event('Comen Live Start', { roomid: config.roomId, platform: config.platform });
                        } else if (msg.type == 'livestop') {
                            this.analytic.event('Comen Live Stop', { roomid: config.roomId, platform: config.platform });
                        } else {
                            this.showMessage(msg);
                        }
                    })
                )
            }),
            catchError(e=>{
                this.analytic.event('Comen Panic',e);
                throw e;
            }),
            retry(),
            this.rxzone.subscribeOutsideAngular(),
            takeUntil(this.destroy$)
        ).subscribe();
    }
}