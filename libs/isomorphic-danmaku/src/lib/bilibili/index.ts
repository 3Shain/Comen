import { inflate } from "pako";
import { AsyncWebSocket } from "../ws";

export async function* connectBilibiliLiveWs(options: {
    roomId: number | string;
    token?: string;
    abort?: AbortController; // TODO: allow abort
    host?: string;
}): AsyncGenerator<unknown, number, unknown> {
    const ws = new AsyncWebSocket();
    await ws.connect(options.host ?? 'wss://broadcastlv.chat.bilibili.com/sub');
    ws.send(packageObject(7, {
        uid: 0,
        roomid: Number(options.roomId),
        protover: 2,
        platform: 'web',
        clientver: '2.4.16',
        ...(options.token ? { key: options.token } : {})
    }));
    ws.send(packageHeartbeat());
    const heartbeat = setInterval(() => {
        ws.send(packageHeartbeat());
    }, 30 * 1000);
    options.abort && (options.abort.signal.onabort = () => {
        ws.close();
    });
    while (true) {
        try {
            const dataArray = decodeData(await ws.receive());
            for (const data of dataArray) {
                try {
                    yield data;
                } catch (e) {
                    // userland error
                }
            }
        }
        catch (e) {
            if (e == 'CLOSED') { // TODO: natural terminate? abortController?
                return 0;
            }
            //decoder error OR terminated
            break;
        }
    }
    clearInterval(heartbeat);
    return -1;
}


function packageHeartbeat() {
    const body = new TextEncoder().encode('[object Object]');
    return packageBinary(2, body);
}

function packageBinary(type: number, body: Uint8Array) {
    const tmp = new Uint8Array(16 + body.byteLength);
    const headDataView = new DataView(tmp.buffer);
    headDataView.setInt32(0, tmp.byteLength);
    headDataView.setInt16(4, 16);
    headDataView.setInt16(6, 1);
    headDataView.setInt32(8, type); // verify
    headDataView.setInt32(12, 1);
    tmp.set(body, 16);
    return tmp;
}

function packageObject(type: number, bufferObj: unknown) {
    return packageBinary(type, new TextEncoder().encode(JSON.stringify(bufferObj)));
}

function decodeData(buffer: ArrayBuffer): Array<unknown> {
    const arr = new Uint8Array(buffer);
    const view = new DataView(arr.buffer);
    const packs = [];
    let offset = 0;
    while (offset < arr.byteLength) {
        const protocol = view.getInt16(6 + offset);
        const type = view.getInt32(8 + offset);
        if (type === 5) {
            const section = arr.slice(offset + view.getInt16(4 + offset), view.getInt32(offset) + offset);
            if (protocol === 0) {
                packs.push(JSON.parse(new TextDecoder().decode(section)));
            }
            if (protocol === 2) {
                packs.push(...decodeData(inflate(section)));
            }
        }
        offset += view.getInt32(offset);
    }
    return packs;
}