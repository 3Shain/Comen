import { crypto } from '../crypto';
import * as Long from "long";
import * as protobuf from 'protobufjs/minimal';
import { inflate } from 'pako';
import { AsyncWebSocket } from "../ws";
import { APP_ID, APP_NAME, CLIENT_LIVE_SDK_VERSION, Command, GlobalCommand, KPF, KPN, PushMessage, SDK_VERSION, SUB_BIZ } from "./consts";
import { AcfunActionSignalJoinClub, AcfunActionSignalThrowBanana, AcfunStateSignalDisplayInfo } from "./models/acfun.live";
import { AppInfo } from "./models/AppInfo";
import { CommonActionSignalComment } from "./models/CommonActionSignalComment";
import { CommonActionSignalGift } from "./models/CommonActionSignalGift";
import { CommonActionSignalLike } from "./models/CommonActionSignalLike";
import { CommonActionSignalRichText } from './models/CommonActionSignalRichText';
import { CommonActionSignalUserEnterRoom } from "./models/CommonActionSignalUserEnterRoom";
import { CommonActionSignalUserFollowAuthor } from "./models/CommonActionSignalUserFollowAuthor";
import { CommonNotifySignalKickedOut } from "./models/CommonNotifySignalKickedOut";
import { CommonStateSignalCurrentRedpackList } from './models/CommonStateSignalCurrentRedpackList';
import { CommonStateSignalDisplayInfo } from './models/CommonStateSignalDisplayInfo';
import { DeviceInfo, DeviceInfo_PlatformType } from "./models/DeviceInfo";
import { DownstreamPayload } from "./models/DownstreamPayload";
import { KeepAliveRequest } from "./models/KeepAlive";
import { PacketHeader, PacketHeader_EncryptionMode } from "./models/PacketHeader";
import { RegisterRequest, RegisterRequest_ActiveStatus, RegisterRequest_PresenceStatus, RegisterResponse } from "./models/Register";
import { TokenInfo, TokenInfo_TokenType } from "./models/TokenInfo";
import { UpstreamPayload } from "./models/UpstreamPayload";
import { ZtCommonInfo } from "./models/ZtCommonInfo";
import { ZtLiveCsCmd, ZtLiveCsCmdAck } from "./models/ZtLiveCsCmd";
import { ZtLiveCsEnterRoom, ZtLiveCsEnterRoomAck } from "./models/ZtLiveCsEnterRoom";
import { ZtLiveCsHeartbeat } from "./models/ZtLiveCsHeartbeat";
import { ZtLiveScActionSignal } from "./models/ZtLiveScActionSignal";
import { ZtLiveScMessage, ZtLiveScMessage_CompressionType } from "./models/ZtLiveScMessage";
import { ZtLiveScNotifySignal } from "./models/ZtLiveScNotifySignal";
import { ZtLiveScStateSignal } from "./models/ZtLiveScStateSignal";
import { decode, Encodable, encode } from "./utils";

export class StatefulAcfunClient {

    constructor(
        private readonly uid: number,
        private readonly acSecurity: string,
        private readonly tickets: string[],
        private readonly enterRoomAttach: string,
        private readonly serviceToken: string,
        private readonly liveid: string,
        private readonly ws: AsyncWebSocket,
        private instanceId: Long = Long.ZERO,
        private seqId = 0
    ) {

    }

    serviceKey: CryptoKey = null;
    sessionKey: CryptoKey = null;
    get ticket() {
        return this.tickets[0];
    }

    async init() {
        protobuf.util.Long = Long;
        protobuf.configure();
        // eslint-disable-next-line
        const bKey = (globalThis as any).Buffer != undefined ? Buffer.from(this.acSecurity, "base64") : Uint8Array.from(atob(this.acSecurity), c => c.charCodeAt(0));
        this.serviceKey = await crypto.subtle.importKey("raw", bKey, { name: "AES-CBC" }, true, ["encrypt", "decrypt"]);
    }

    async registerRequest() {
        const req = RegisterRequest.fromPartial({
            appInfo: AppInfo.fromPartial({
                appName: APP_NAME,
                sdkVersion: SDK_VERSION
            }),
            deviceInfo: DeviceInfo.fromPartial({
                platformType: DeviceInfo_PlatformType.H5,
                deviceModel: "h5"
            }),
            presenceStatus: RegisterRequest_PresenceStatus.kPresenceOnline,
            appActiveStatus: RegisterRequest_ActiveStatus.kAppInForeground,
            ztCommonInfo: ZtCommonInfo.fromPartial({
                kpn: KPN,
                kpf: KPF,
                uid: this.uid
            })
        });
        const [header, body] = this.generatePayload(Command.REGISTER, RegisterRequest, req);
        header.encryptionMode = PacketHeader_EncryptionMode.kEncryptionServiceToken;
        header.tokenInfo = TokenInfo.fromPartial({
            tokenType: TokenInfo_TokenType.kServiceToken,
            token: (new TextEncoder()).encode(this.serviceToken)
        });

        this.seqId++;
        return await encode(header, body, this.serviceKey)
    }

    async downstreamPayload(body: ArrayBuffer) {
        return await decode(DownstreamPayload, new Uint8Array(body), this.serviceKey, this.sessionKey);
    }

    l4zcompressionThreshold = 0;

    async registerResponse(body: ArrayBuffer) {
        const [, payload] = await this.downstreamPayload(body);
        const resp = RegisterResponse.decode(payload.payloadData);
        this.instanceId = resp.instanceId;
        this.sessionKey = await crypto.subtle.importKey("raw", resp.sessKey, "AES-CBC", true, ["encrypt", "decrypt"]);
        this.l4zcompressionThreshold = resp.sdkOption.lz4CompressionThresholdBytes;
    }

    hbSeqid = 1;
    async heartbeatRequest() {
        const hb = ZtLiveCsHeartbeat.fromPartial({
            clientTimestampMs: Date.now(),
            sequence: this.hbSeqid++
        });
        const [header, body] = this.gennerateCommand(GlobalCommand.HEARTBEAT, ZtLiveCsHeartbeat, hb);
        this.seqId++;
        return await encode(header, body, this.sessionKey);
    }

    async keepAliveRequest() {
        const keepalive = KeepAliveRequest.fromPartial({
            presenceStatus: RegisterRequest_PresenceStatus.kPresenceOnline,
            appActiveStatus: RegisterRequest_ActiveStatus.kAppInForeground
        });

        const [header, body] = this.generatePayload(Command.KEEP_ALIVE, KeepAliveRequest, keepalive);
        this.seqId++;
        return await encode(header, body, this.sessionKey);
    }

    async enterRoomRequest() {
        const enterrrom = ZtLiveCsEnterRoom.fromPartial({
            enterRoomAttach: this.enterRoomAttach,
            clientLiveSdkVersion: CLIENT_LIVE_SDK_VERSION
        });
        const [header, body] = this.gennerateCommand(GlobalCommand.ENTER_ROOM, ZtLiveCsEnterRoom, enterrrom);
        this.seqId++;
        return await encode(header, body, this.sessionKey);
    }

    async enterRoomResponse(body: ArrayBuffer) {
        const [, payload] = await this.downstreamPayload(body);
        const rep = ZtLiveCsCmdAck.decode(payload.payloadData);
        const enterRoomAck = ZtLiveCsEnterRoomAck.decode(rep.payload);
        return enterRoomAck.heartbeatIntervalMs;
    }

    async *parse(body: ArrayBuffer): AsyncGenerator<unknown, void, unknown> {
        const [header, payload] = await this.downstreamPayload(body);
        switch (payload.command) {
            case Command.PUSH_MESSAGE:
                {
                    this.ws.send(await this.pushMessageResponse(header.seqId));
                    const message = ZtLiveScMessage.decode(payload.payloadData);
                    const g = LiveSCPayloadTypeMap[message.messageType]?.decode(message.compressionType == ZtLiveScMessage_CompressionType.GZIP ? inflate(message.payload) : message.payload);
                    if (g) {
                        switch (message.messageType) {
                            case PushMessage.ACTION_SIGNAL:
                                for (const item of g.item) {
                                    if (item.payload instanceof Array) {
                                        for (const payload of item.payload) {
                                            yield {
                                                type: item.signalType,
                                                data: ActionSingalMap[item.signalType]?.decode(payload)
                                            };
                                        }
                                    } else {
                                        yield {
                                            type: item.signalType,
                                            data: ActionSingalMap[item.signalType]?.decode(item.payload)
                                        }
                                    }
                                }
                                break;
                            case PushMessage.STATE_SIGNAL:
                                for (const item of g.item) {
                                    if (item.payload instanceof Array) {
                                        for (const payload of item.payload) {
                                            yield {
                                                type: item.signalType,
                                                data: StateSingalMap[item.signalType]?.decode(payload)
                                            }
                                        }
                                    } else if (item.payload) {
                                        yield {
                                            type: item.signalType,
                                            data: StateSingalMap[item.signalType]?.decode(item.payload)
                                        }
                                    }
                                }
                                break;
                            case PushMessage.NOTIFY_SIGNAL:
                                for (const item of g.item) {
                                    if (item.payload instanceof Array) {
                                        for (const payload of item.payload) {
                                            yield {
                                                type: item.signalType,
                                                data: NotifySignalMap[item.signalType]?.decode(payload)
                                            }
                                        }
                                    } else if (item.payload) {
                                        yield {
                                            type: item.signalType,
                                            data: NotifySignalMap[item.signalType]?.decode(item.payload)
                                        }
                                    }
                                }
                                break;
                            case PushMessage.STATUS_CHANGED:
                                for (const item of g.item) {
                                    if (item.payload instanceof Array) {
                                        for (const payload of item.payload) {
                                            yield {
                                                type: item.signalType,
                                                data: StatusChangeMap[item.signalType]?.decode(payload)
                                            }
                                        }
                                    } else if (item.payload) {
                                        yield {
                                            type: item.signalType,
                                            data: StatusChangeMap[item.signalType]?.decode(item.payload)
                                        }
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                }
            default:
                break;
        }
    }

    async pushMessageResponse(hid: Long) {
        const [header, body] = this.generatePayload(Command.PUSH_MESSAGE);
        header.seqId = hid;
        return await encode(header, body, this.sessionKey);
    }

    gennerateCommand<T>(command: string, type: Encodable<T>, payload: T) {
        const cmd = ZtLiveCsCmd.fromPartial({
            cmdType: command,
            ticket: this.ticket,
            liveId: this.liveid,
            payload: type.encode(payload).finish()
        });
        return this.generatePayload(Command.GLOBAL_COMMAND, ZtLiveCsCmd, cmd);
    }

    generatePayload<T>(command: string, req?: Encodable<T>, reqBody?: T): [PacketHeader, Uint8Array] {
        const usp = UpstreamPayload.fromPartial({
            command: command,
            retryCount: 1,
            seqId: this.seqId,
            subBiz: SUB_BIZ,
            payloadData: req ? req.encode(reqBody).finish() : undefined
        });

        const uspDecoded = UpstreamPayload.encode(usp).finish();

        const ph = PacketHeader.fromPartial({
            appId: APP_ID,
            uid: this.uid,
            instanceId: this.instanceId,
            decodedPayloadLen: uspDecoded.byteLength,
            encryptionMode: PacketHeader_EncryptionMode.kEncryptionSessionKey,
            seqId: this.seqId,
            kpn: KPN
        })

        return [ph, uspDecoded];
    }

}

const LiveSCPayloadTypeMap = {
    [PushMessage.ACTION_SIGNAL]: ZtLiveScActionSignal,
    [PushMessage.NOTIFY_SIGNAL]: ZtLiveScNotifySignal,
    [PushMessage.STATE_SIGNAL]: ZtLiveScStateSignal,
}

const ActionSingalMap = {
    [PushMessage.ActionSignal.COMMENT]: CommonActionSignalComment,
    [PushMessage.ActionSignal.GIFT]: CommonActionSignalGift,
    [PushMessage.ActionSignal.ENTER_ROOM]: CommonActionSignalUserEnterRoom,
    [PushMessage.ActionSignal.FOLLOW]: CommonActionSignalUserFollowAuthor,
    [PushMessage.ActionSignal.JOIN_CLUB]: AcfunActionSignalJoinClub,
    [PushMessage.ActionSignal.LIKE]: CommonActionSignalLike,
    [PushMessage.ActionSignal.RICH_TEXT]: CommonActionSignalRichText,
    [PushMessage.ActionSignal.THROW_BANANA]: AcfunActionSignalThrowBanana,
}

const StateSingalMap = {
    [PushMessage.StateSignal.DISPLAY_INFO]: CommonStateSignalDisplayInfo,
    [PushMessage.StateSignal.CURRENT_RED_PACK_LIST]: CommonStateSignalCurrentRedpackList,
    [PushMessage.StateSignal.ACFUN_DISPLAY_INFO]: AcfunStateSignalDisplayInfo,
}

const NotifySignalMap = {
    [PushMessage.NotifySignal.KICKED_OUT]: CommonNotifySignalKickedOut,
}

const StatusChangeMap = {

}