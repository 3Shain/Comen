import { Observable, OperatorFunction } from 'rxjs';

/**
 * one trial pipe
 * do not use in data stream, order is not guaranteed
 */
export function waitUntilVisible<T>(): OperatorFunction<T, T> {
    return (upstream) => {
        return new Observable(observer => {
            return upstream.subscribe({
                next(x) {
                    if (document.visibilityState == 'visible') {
                        observer.next(x);
                        observer.complete();
                        return;
                    }
                    const teardown = registerVisibilityChange(v => {
                        if (v) {
                            observer.next(x);
                            observer.complete();
                            teardown();
                        }
                    });
                },
                error: observer.error.bind(observer)
            })
        })
    }
}

export function registerVisibilityChange(cb: (visible: boolean) => unknown) {
    // eslint-disable-next-line
    if ((window as any).obsstudio) {
        const handler = (ev: CustomEvent) => {
            cb(ev.detail.visible);
        }
        window.addEventListener('obsSourceVisibleChanged', handler);
        return () => {
            document.removeEventListener('obsSourceVisibleChanged', handler);
        }
    } else {
        const handler = () => {
            cb(document.visibilityState === 'visible');
        };
        document.addEventListener('visibilitychange', handler);
        return () => {
            document.removeEventListener('visibilitychange', handler);
        }
    }
}