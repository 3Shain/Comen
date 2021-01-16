import * as WebSocket from 'isomorphic-ws'

/**
 * Not very performative but ok async websocket
 */
export class AsyncWebSocket {

    private ws: WebSocket;

    private bufferQueue: ArrayBuffer[] = [];

    async connect(url: string): Promise<void> {
        if (this.ws != null) {
            throw 'CONNECTED!';
        }
        await new Promise((res, rej) => {
            this.ws = new WebSocket(url);
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = res;
            this.ws.onerror = rej;
        });
        this.ws.onopen = null;
        this.ws.onmessage = this.onmessage.bind(this);
        this.ws.onerror = this.onerror.bind(this);
        this.ws.onclose = () => {
            if (this.resolveCursor) {
                this.resolveCursor[1]('CLOSED');
            }
            this.ws.onmessage = null;
            this.ws.onerror = null;
            this.ws.onclose = null;
            this.ws = null;
        }
    }

    send(src: ArrayBuffer | ArrayBufferView) {
        if (!this.ws) {
            throw new Error('not connected');
        }
        this.ws.send(src);
    }

    private resolveCursor: [(res: ArrayBuffer) => void, (rej: unknown) => void] | null;

    receive(): Promise<ArrayBuffer> {
        if (this.ws.readyState == this.ws.CLOSED) {
            throw 'CLOSED';
        }
        else if (this.ws.readyState != this.ws.OPEN) {
            throw 'NOT_OPEN';
        }
        if (this.bufferQueue.length > 0) {
            return Promise.resolve(this.bufferQueue.shift());
        }
        else if (this.resolveCursor != null) {
            throw 'OPERATION NOT EXPECTED BECAUSE THERE IS ALREADY ANOTHER RECEIVER';
        }
        const toBeResole = new Promise<ArrayBuffer>((res, rej) => {
            this.resolveCursor = [res, rej];
        });
        return toBeResole;
    }

    close(code?: number, reason?: string) {
        this.ws.close(code, reason);
    }

    private onmessage(data: WebSocket.MessageEvent) {
        if (this.resolveCursor) {
            this.resolveCursor[0](data.data as ArrayBuffer);
            this.resolveCursor = null;
        } else {
            this.bufferQueue.push(data.data as ArrayBuffer);
        }
    }

    private onerror(error: unknown) {
        if (this.resolveCursor) {
            this.resolveCursor[1](error);
            this.resolveCursor = null;
        }
    }
}