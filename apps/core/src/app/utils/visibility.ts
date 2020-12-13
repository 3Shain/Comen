import { Observable, OperatorFunction } from "rxjs";

export function waitUntilVisible<T>(): OperatorFunction<T, T> {
    return (upstream) => {
        return new Observable(observer => {
            return upstream.subscribe({
                next(x) {
                    if (document.visibilityState == "visible") {
                        observer.next(x);
                        return;
                    }
                    const teardown = registerVisibilityChange(v => {
                        v && observer.next(x), teardown();
                    });
                },
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer)
            })
        })
    }
}

export function registerVisibilityChange(cb: (visible: boolean) => unknown) {
    if ((window as any).obsstudio) {
        const handler = (ev: CustomEvent) => {
            cb(ev.detail.visible);
        }
        window.addEventListener("obsSourceVisibleChanged", handler);
        return () => {
            document.removeEventListener("obsSourceVisibleChanged", handler);
        }
    } else {
        const handler = (ev: Event) => {
            cb(document.visibilityState === "visible");
        };
        document.addEventListener("visibilitychange", handler);
        return () => {
            document.removeEventListener("visibilitychange", handler);
        }
    }
}