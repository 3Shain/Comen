import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ComenEnvironmentHost,
  ComenSerializedData,
  Message,
  SafeAny,
  TextMessage,
} from '@comen/common';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, retry, takeUntil, tap } from 'rxjs/operators';
import { AddonService } from '../../addon/addon.service';
import { OverlayContainerComponent } from '../../addon/overlay-container.component';
import { commentFilter, folder, smoother } from '../../common';
import { deserializeBase64 } from '../../common/base64';
import { emojiFilter } from '../../common/emoji';
import { RxZone } from '../../common/rx';
import { nextFrame, waitUntilPageVisible } from '../../common/utils';
import {
  ComenConfiguration,
  DEFAULT_CONFIG,
  mergeQueryParameters,
} from '../../config';

const BILICHAT_SYSTEM_MESSAGE = {
  FETCHING: '正在获取直播间信息...',
  CONNECTING: '正在连接到直播间...',
  CONNECTED: '成功连接到直播间!',
  ERROR: '检测到服务器断开,尝试重连中...',
};

@Component({
  selector: 'comen-overlay',
  template: `<comen-overlay-container
      #container="overlayContainer"
    ></comen-overlay-container>
    <div id="comen-configuration-data" #data></div>`,
  styles: [
    `
      #comen-configuration-data {
        display: none;
      }
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
      }
    `,
  ],
  viewProviders: [
    RxZone,
    {
      provide: ComenEnvironmentHost,
      useExisting: OverlayPage,
    },
  ],
})
// eslint-disable-next-line
export class OverlayPage implements OnInit, OnDestroy {
  @ViewChild('data', { static: true }) data: ElementRef<HTMLDivElement>;
  @ViewChild('container', { static: true })
  container: OverlayContainerComponent;

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private rxzone: RxZone,
    private addon: AddonService
  ) {}

  get addonTarget() {
    return this.activatedRoute.snapshot.queryParams.o ?? 'null';
  }

  message$: Subject<Message> = new Subject();

  async ngOnInit() {
    await waitUntilPageVisible();
    // init element?
    const queryParams = this.activatedRoute.snapshot.queryParams;
    // Query parameters are not expected to change. Any change is not responsed
    // unless component is fully reconstructed.
    const injectedConfiguration = await this.initConfig();
    const globalConfig = mergeQueryParameters(queryParams, {
      ...DEFAULT_CONFIG,
      ...(injectedConfiguration?.config?.['@@comen']?.default ?? {}),
    });

    const bootstraped = this.container.bootstrap(
      this.addonTarget,
      new OverlayComenEnvironmentHost(
        this.addonTarget,
        this.message$,
        globalConfig,
        injectedConfiguration
      )
    );
    this.destroy$.subscribe(() => bootstraped.destroy());

    if ('bilichat' in globalConfig) {
      setTimeout(() => {
        // here showMessage is expected not undefined!
        this.message$.next({
          type: 'blank',
        });
      }, 0);
    }
    this.addon
      .connectSource(globalConfig.platform, globalConfig)
      .pipe(
        filter(() => document.visibilityState == 'visible'),
        // this is important! because some filter depend on requestAnimationFrame will cause some weired behavior
        commentFilter(globalConfig),
        smoother(globalConfig),
        folder(globalConfig),
        map((msg) => {
          if ('bilichat' in globalConfig) {
            if (msg.type == 'system') {
             return ({
                type: 'text',
                content: BILICHAT_SYSTEM_MESSAGE[msg.data.status],
                avatar: '/assets/bilichat_icon.png',
                usertype: 0b10,
                username: 'BILICHAT',
              } as TextMessage);
            } else if (msg.type == 'sticker') {
              // bilichat has no sticker type, downgrade to mock paid message
              return ({
                type: 'paid',
                itemInfo: msg.itemInfo,
                price: msg.price,
                content: null,
                avatar: msg.avatar,
                username: msg.username,
                platformUserId: msg.platformUserId,
              });
            }
          }
          return msg;
        }),
        emojiFilter(globalConfig),
        tap((msg) => {
          this.message$.next(msg);
        }),
        catchError((e) => {
          if (e == 'NOT_FOUND') {
            console.error('ADDON NOT FOUND'); // TODO: Error UI
            return of();
          }
          console.error(e);
          throw e;
        }),
        retry(), //TODO: endless retry will cause stackoverflow
        this.rxzone.subscribeOutsideAngular(),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async initConfig(): Promise<ComenSerializedData> {
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
    }
    return { config: {}, data: [] };
  }
}

class OverlayComenEnvironmentHost extends ComenEnvironmentHost {
  message(): Observable<Message> {
    return this._message;
  }
  config(section: string) {
    if (section == '@@comen') {
      return this._globalConfig;
    }
    return this._config[section] ?? {};
  }
  variantPipe(section: string): (context: any) => any {
    throw new Error('Method not implemented.');
  }
  assetUrl(id: string): string {
    if (this.assetsMap.has(id)) {
      return this.assetsMap.get(id);
    }
    throw new Error(`Assets name "${id}" was not found.`);
  }

  private assetsMap: Map<string, string>;

  constructor(
    public rootElement: SafeAny,
    private _message: Observable<Message>,
    private _globalConfig: ComenConfiguration,
    private _config: ComenSerializedData,
  ) {
    super();
    this.assetsMap = new Map(
      _config.data.map((x) => {
        return [
          x.name,
          URL.createObjectURL(new Blob([x.body], { type: x.type })),
        ];
      })
    );
  }
}
