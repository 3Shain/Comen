import { Injectable } from '@angular/core';
import posthog from 'posthog-js';
import { environment } from '../../environments/environment';

@Injectable()
export class AnalyticsService {

    on = false;
    disabled = false;

    init() {
        if (!environment.production) {
            return Promise.resolve();
        }
        return new Promise((res) => {
            posthog.init(environment.analytics_token, {
                loaded: () => {
                    res(void 0);
                    if(!this.disabled){
                        this.on = true;
                    }
                },
                api_host: 'https://analytics.3shain.com',
                capture_pageview: false,
                disable_cookie: false, // it's meaningless
                autocapture: false,
                disable_session_recording: true
            } as unknown);
            setTimeout(res,1000); // in case analytic server is down
        });
    }

    event(event: string, data: any) {
        if (environment.production&&this.on) {
            posthog.capture(event, data);
        }
    }
} 