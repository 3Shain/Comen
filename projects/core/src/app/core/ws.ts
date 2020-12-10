
export class AsWebSocket {

    private ws: WebSocket;

    private bufferQueue: any[] = [];

    connect(url: string): Promise<void> {
        return new Promise((res, rej) => {
            this.ws = new WebSocket(url);
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = (e) => {
                res();
                this.ws.onopen = null;
            };
            this.ws.onmessage = this.onmessage.bind(this);
            this.ws.onerror = this.onerror.bind(this);
        });
    }

    send(src: ArrayBuffer | ArrayBufferView) {
        this.ws.send(src);
    }

    get dataAvaliable() {
        return true;
    }

    resolveCursor: [(res: any) => void, any] | null;

    receive<T = ArrayBuffer>(): Promise<T> {
        if (this.bufferQueue.length > 0) {
            return Promise.resolve(this.bufferQueue.shift());
        }
        const toBeResole = new Promise<T>((res, rej) => {
            this.resolveCursor = [res, rej];
        });
        return toBeResole;
    }

    close(code?: number, reason?: string) {
        this.ws.close(code, reason);
    }

    private onmessage(data: MessageEvent) {
        if (this.resolveCursor) {
            this.resolveCursor[0](data.data);
            this.resolveCursor = null;
        } else {
            this.bufferQueue.push(data.data);
        }
    }

    private onerror() {
        if (this.resolveCursor) {
            this.resolveCursor[1]();
            this.resolveCursor = null;
        } else {

        }
    }
}