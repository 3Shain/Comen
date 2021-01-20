import { ApplicationRef, Component, ElementRef, Inject, ViewChild, ɵdetectChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { nextFrame } from '@comen/common';
import { ReplaySubject, Subject } from 'rxjs';
import { CSSINJECT_CONFIG_TOKEN } from './config';

export function CONFIG_FACTORY() {
  return new ReplaySubject<string>(1);
}

@Component({
  selector: 'comen-root',
  template: `<router-outlet></router-outlet>
  <div id="comen-configuration-data" #data></div>`,
  providers: [
    {
      provide: CSSINJECT_CONFIG_TOKEN,
      useFactory: CONFIG_FACTORY
    }
  ]
})
export class AppComponent {

  @ViewChild('data') data: ElementRef<HTMLDivElement>;

  constructor(private app: ApplicationRef,
    private router: Router,
    @Inject(CSSINJECT_CONFIG_TOKEN) private config$: Subject<string>) {
    /**
     * temporary workaround for zoneless router
     */
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // app.tick();
        ɵdetectChanges(this);
      }
    });
  }

  async ngAfterViewInit() {
    // config in css
    if ('obsstudio' in window) {
      let retryCount = 0;
      // wait 10 frame to fetch
      while (retryCount < 10) {
        await nextFrame();
        const ret = getComputedStyle(this.data.nativeElement, ':after').content;
        if (ret != 'none') {
          this.config$.next(ret);
          return;
        }
        retryCount++;
      }
      this.config$.next(null);
    } else {
      await nextFrame();
      await nextFrame();
      this.config$.next(null);
    }
  }
}
