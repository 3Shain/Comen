/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface AuthorChatPlayerInfo {
  player: ZtLiveUserInfo | undefined;
  liveId: string;
  enableJumpPeerLiveRoom: boolean;
}

const baseAuthorChatPlayerInfo: object = {
  liveId: "",
  enableJumpPeerLiveRoom: false,
};

export const protobufPackage = 'AcFunDanmu'

export const AuthorChatPlayerInfo = {
  encode(message: AuthorChatPlayerInfo, writer: Writer = Writer.create()): Writer {
    if (message.player !== undefined && message.player !== undefined) {
      ZtLiveUserInfo.encode(message.player, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.liveId);
    writer.uint32(24).bool(message.enableJumpPeerLiveRoom);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AuthorChatPlayerInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAuthorChatPlayerInfo } as AuthorChatPlayerInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.player = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.liveId = reader.string();
          break;
        case 3:
          message.enableJumpPeerLiveRoom = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AuthorChatPlayerInfo {
    const message = { ...baseAuthorChatPlayerInfo } as AuthorChatPlayerInfo;
    if (object.player !== undefined && object.player !== null) {
      message.player = ZtLiveUserInfo.fromJSON(object.player);
    } else {
      message.player = undefined;
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = String(object.liveId);
    } else {
      message.liveId = "";
    }
    if (object.enableJumpPeerLiveRoom !== undefined && object.enableJumpPeerLiveRoom !== null) {
      message.enableJumpPeerLiveRoom = Boolean(object.enableJumpPeerLiveRoom);
    } else {
      message.enableJumpPeerLiveRoom = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AuthorChatPlayerInfo>): AuthorChatPlayerInfo {
    const message = { ...baseAuthorChatPlayerInfo } as AuthorChatPlayerInfo;
    if (object.player !== undefined && object.player !== null) {
      message.player = ZtLiveUserInfo.fromPartial(object.player);
    } else {
      message.player = undefined;
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = object.liveId;
    } else {
      message.liveId = "";
    }
    if (object.enableJumpPeerLiveRoom !== undefined && object.enableJumpPeerLiveRoom !== null) {
      message.enableJumpPeerLiveRoom = object.enableJumpPeerLiveRoom;
    } else {
      message.enableJumpPeerLiveRoom = false;
    }
    return message;
  },
  toJSON(message: AuthorChatPlayerInfo): unknown {
    const obj: any = {};
    message.player !== undefined && (obj.player = message.player ? ZtLiveUserInfo.toJSON(message.player) : undefined);
    message.liveId !== undefined && (obj.liveId = message.liveId);
    message.enableJumpPeerLiveRoom !== undefined && (obj.enableJumpPeerLiveRoom = message.enableJumpPeerLiveRoom);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;