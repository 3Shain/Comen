import { AsyncWebSocket } from "../ws";
import { StatefulAcfunClient } from "./requests";

export async function* connectAcfunLiveWs(options: {
    roomId: number | string,
    acSecurity: string,
    tickets: string[],
    serviceToken: string;
    enterRoomAttach: string;
    userId: number;
    liveId: string;
    abort?: AbortController; // TODO: allow abort
}): AsyncGenerator<unknown, number, unknown> {
    const ws = new AsyncWebSocket();
    // console.log(options);
    const client = new StatefulAcfunClient(options.userId, options.acSecurity, options.tickets, options.enterRoomAttach,
        options.serviceToken, options.liveId, ws);
    await client.init();
    await ws.connect('wss://link.xiatou.com/');
    ws.send(await client.registerRequest());
    await client.registerResponse(await ws.receive());
    ws.send(await client.registerRequest());
    await client.registerResponse(await ws.receive());
    ws.send(await client.keepAliveRequest());
    await ws.receive();
    ws.send(await client.enterRoomRequest());
    const interval = await client.enterRoomResponse(await ws.receive());
    const heartbeat = setInterval(async () => {
        ws.send(await client.heartbeatRequest());
        ws.send(await client.keepAliveRequest());
    }, interval.toInt());
    yield {
        type: '__CONNECTED__' // library defined message
    };
    while (true) {
        try {
            for await (const msg of client.parse(await ws.receive())) {
                try {
                    yield msg;
                } catch {
                    // userland error
                }
            }
        }
        catch (e) {
            //parser error
            break;
        }
    }
    clearInterval(heartbeat);
    return -1;
}