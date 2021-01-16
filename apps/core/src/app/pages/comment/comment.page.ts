import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { GammaConfiguration, Message, MessageProvider, MESSAGE_PROVIDER, TextMessage } from '@comen/gamma';
import { waitUntilVisible } from '../../utils/visibility';
import { CommentSource, SOURCE_PROVIDER } from '../../sources';
import { commentFilter, folder, smoother, ComenMessage } from '../../common';
import { ComenConfiguration, CSSINJECT_CONFIG_TOKEN, mergeQueryParameters, parseConfiguration, DEFAULT_CONFIG } from '../../config';

@Component({
    selector: 'comen-comment',
    template: `<yt-live-chat-app></yt-live-chat-app>`,
    viewProviders: [{
        provide: MESSAGE_PROVIDER,
        useExisting: CommentPage
    }]
})
// eslint-disable-next-line
export class CommentPage implements MessageProvider, OnDestroy, AfterViewInit {

    private showMessage?: (msg: ComenMessage) => unknown;
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
        @Inject(SOURCE_PROVIDER) private sources: CommentSource[],
        @Inject(CSSINJECT_CONFIG_TOKEN) private config$: Subject<string>
    ) { }

    ngAfterViewInit() {
        combineLatest([this.activatedRoute.queryParams, this.config$]).pipe(
            waitUntilVisible(), // actully not expect to be executed twice!
            map(([query, data]) => {
                return mergeQueryParameters(query,
                    parseConfiguration<ComenConfiguration>(data, DEFAULT_CONFIG))
            }),
            tap((config) => {
                this.configureGamma(config as any);
                if ('bilichat' in config) {
                    setTimeout(() => {
                        // here showMessage is expected not undefined!
                        this.showMessage({
                            type: 'blank'
                        });
                    }, 0);
                }
                console.log(config);
            }),
            switchMap((configuration) => {
                // TODO: safe check : does plaform exist
                return this.sources.find(x => x.type == (configuration.platform ?? 'bilibili')).connect(configuration).pipe(
                    commentFilter(configuration),
                    smoother(configuration),
                    folder(configuration),
                    filter((msg) => {
                        if ('bilichat' in configuration){
                            if(msg.type == 'system') {
                                console.log(msg);
                                this.showMessage({
                                    type: 'text',
                                    content: 'System',
                                    avatar: '/assets/bilichat_icon.png',
                                    usertype: 0b10,
                                    username: 'BILICHAT'
                                } as TextMessage);
                            } else if(msg.type == 'sticker') {
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
                    })
                )
            }),
            tap((msg) => {
                this.showMessage(msg);
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }
}
