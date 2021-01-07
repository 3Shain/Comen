import { Component, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Message, MessageProvider, MESSAGE_PROVIDER } from '@comen/gamma';
import { waitUntilVisible } from '../utils/visibility';
import { CommentSource, SOURCE_PROVIDER } from '../core/source';
import { commentFilter, smoother } from '../core/filter';

@Component({
    selector: 'comen-platform',
    template: `<yt-live-chat-app></yt-live-chat-app>`,
    viewProviders: [{
        provide: MESSAGE_PROVIDER,
        useExisting: PlatformPage
    }]
})
// eslint-disable-next-line
export class PlatformPage implements MessageProvider, OnDestroy {

    private showMessage?: (msg: Message) => unknown;
    private destroy$: Subject<void> = new Subject();
    private configuration$: Subject<unknown> = new Subject();

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    registerOnMessage(fnMsg: (msg: Message) => unknown) {
        this.showMessage = fnMsg;
    }

    configure(val: unknown) {
        this.configuration$.next(val);
        this.configuration$.complete();
    }

    constructor(
        activatedRoute: ActivatedRoute,
        @Inject(SOURCE_PROVIDER) sources: CommentSource[]
    ) {
        combineLatest([activatedRoute.queryParams, this.configuration$]).pipe(
            waitUntilVisible(),
            switchMap(([query]) => {
                return sources.find(x => x.type == query.p ?? 'bilibili').connect({ roomId: query.id }).pipe(
                    commentFilter({}),
                    smoother({})
                )
            }),
            tap((msg) => {
                this.showMessage(msg);
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

}

interface PlatformConfiguration {

    /**
     * Filters (very basic)
     */
    uidBlacklist: number[],
    minGiftValue: number,
    wordFilter: number,
    levelFilter: number, //? what level?
    hideAvatar: boolean;
    typeFilterControlBit: number; // bits (7h -> 0l): 0 0 0 0 <member> <paid message> <sticker> <message>

    groupSimilar: boolean,
    groupSimilarWindow: number,

    /**
     * Misc
     */
    disableSmoother: boolean,

    /**
     * Renderer settings
     */

    maxDanmakuNumber: number;

    // TODO: color configrations
    // TODO: badges configrations
    // TODO: image assets configrations

    /**
     * Bilibili
     * 
     */

    silverGoldRatio: number,
    showGiftAutoDammaku: boolean,

    /**
     * Acfun
     */
}


