import { HttpClient } from '@angular/common/http';
import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Message, MessageProvider, MESSAGE_PROVIDER } from '@comen/gamma';
import { waitUntilVisible } from '../utils/visibility';
import { commentFilter, smoother } from '../core/filter';
import { CommentSource, SOURCE_PROVIDER } from '../core/source';
import { SSRService } from '../core/ssr';

@Component({
    selector: "comen-bilibili",
    template: `<yt-live-chat-app></yt-live-chat-app>`,
    viewProviders: [{
        provide: MESSAGE_PROVIDER,
        useExisting: BilibiliPage
    }]
})
export class BilibiliPage implements MessageProvider {

    constructor(
        private activatedRoute: ActivatedRoute,
        private http: HttpClient,
        @Inject(SOURCE_PROVIDER) private sources: CommentSource[],
        private ssr: SSRService
    ) {
        combineLatest([activatedRoute.params, activatedRoute.queryParams]).pipe(
            ssr.serverSideForbidden(),
            waitUntilVisible(),
            switchMap(([param, query]) => {
                return sources.find(x => x.type == "bilibili").connect({ roomId: param.id })
            }),
            tap((msg) => {
                this.showMessage(msg);
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    private destroy$: Subject<void> = new Subject();
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private showMessage?: (msg: Message) => unknown;
    registerOnMessage(fnMsg: (msg: Message) => unknown) {
        this.showMessage = fnMsg;
    }
}