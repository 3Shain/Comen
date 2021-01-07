/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveScStatusChanged {
  type: ZtLiveScStatusChanged_Type;
  maxRandomDelayMs: Long;
  bannedInfo: ZtLiveScStatusChanged_BannedInfo | undefined;
}

export interface ZtLiveScStatusChanged_BannedInfo {
  banReason: string;
}

const baseZtLiveScStatusChanged: object = {
  type: 0,
  maxRandomDelayMs: Long.ZERO,
};

const baseZtLiveScStatusChanged_BannedInfo: object = {
  banReason: "",
};

export const protobufPackage = 'AcFunDanmu'

export enum ZtLiveScStatusChanged_Type {
  UNKNOWN = 0,
  LIVE_CLOSED = 1,
  NEW_LIVE_OPENED = 2,
  LIVE_URL_CHANGED = 3,
  LIVE_BANNED = 4,
  UNRECOGNIZED = -1,
}

export function ztLiveScStatusChanged_TypeFromJSON(object: any): ZtLiveScStatusChanged_Type {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ZtLiveScStatusChanged_Type.UNKNOWN;
    case 1:
    case "LIVE_CLOSED":
      return ZtLiveScStatusChanged_Type.LIVE_CLOSED;
    case 2:
    case "NEW_LIVE_OPENED":
      return ZtLiveScStatusChanged_Type.NEW_LIVE_OPENED;
    case 3:
    case "LIVE_URL_CHANGED":
      return ZtLiveScStatusChanged_Type.LIVE_URL_CHANGED;
    case 4:
    case "LIVE_BANNED":
      return ZtLiveScStatusChanged_Type.LIVE_BANNED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZtLiveScStatusChanged_Type.UNRECOGNIZED;
  }
}

export function ztLiveScStatusChanged_TypeToJSON(object: ZtLiveScStatusChanged_Type): string {
  switch (object) {
    case ZtLiveScStatusChanged_Type.UNKNOWN:
      return "UNKNOWN";
    case ZtLiveScStatusChanged_Type.LIVE_CLOSED:
      return "LIVE_CLOSED";
    case ZtLiveScStatusChanged_Type.NEW_LIVE_OPENED:
      return "NEW_LIVE_OPENED";
    case ZtLiveScStatusChanged_Type.LIVE_URL_CHANGED:
      return "LIVE_URL_CHANGED";
    case ZtLiveScStatusChanged_Type.LIVE_BANNED:
      return "LIVE_BANNED";
    default:
      return "UNKNOWN";
  }
}

export const ZtLiveScStatusChanged = {
  encode(message: ZtLiveScStatusChanged, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(16).int64(message.maxRandomDelayMs);
    if (message.bannedInfo !== undefined && message.bannedInfo !== undefined) {
      ZtLiveScStatusChanged_BannedInfo.encode(message.bannedInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveScStatusChanged {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveScStatusChanged } as ZtLiveScStatusChanged;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.maxRandomDelayMs = reader.int64() as Long;
          break;
        case 3:
          message.bannedInfo = ZtLiveScStatusChanged_BannedInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveScStatusChanged {
    const message = { ...baseZtLiveScStatusChanged } as ZtLiveScStatusChanged;
    if (object.type !== undefined && object.type !== null) {
      message.type = ztLiveScStatusChanged_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.maxRandomDelayMs !== undefined && object.maxRandomDelayMs !== null) {
      message.maxRandomDelayMs = Long.fromString(object.maxRandomDelayMs);
    } else {
      message.maxRandomDelayMs = Long.ZERO;
    }
    if (object.bannedInfo !== undefined && object.bannedInfo !== null) {
      message.bannedInfo = ZtLiveScStatusChanged_BannedInfo.fromJSON(object.bannedInfo);
    } else {
      message.bannedInfo = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveScStatusChanged>): ZtLiveScStatusChanged {
    const message = { ...baseZtLiveScStatusChanged } as ZtLiveScStatusChanged;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.maxRandomDelayMs !== undefined && object.maxRandomDelayMs !== null) {
      message.maxRandomDelayMs = object.maxRandomDelayMs as Long;
    } else {
      message.maxRandomDelayMs = Long.ZERO;
    }
    if (object.bannedInfo !== undefined && object.bannedInfo !== null) {
      message.bannedInfo = ZtLiveScStatusChanged_BannedInfo.fromPartial(object.bannedInfo);
    } else {
      message.bannedInfo = undefined;
    }
    return message;
  },
  toJSON(message: ZtLiveScStatusChanged): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = ztLiveScStatusChanged_TypeToJSON(message.type));
    message.maxRandomDelayMs !== undefined && (obj.maxRandomDelayMs = (message.maxRandomDelayMs || Long.ZERO).toString());
    message.bannedInfo !== undefined && (obj.bannedInfo = message.bannedInfo ? ZtLiveScStatusChanged_BannedInfo.toJSON(message.bannedInfo) : undefined);
    return obj;
  },
};

export const ZtLiveScStatusChanged_BannedInfo = {
  encode(message: ZtLiveScStatusChanged_BannedInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.banReason);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveScStatusChanged_BannedInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveScStatusChanged_BannedInfo } as ZtLiveScStatusChanged_BannedInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.banReason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveScStatusChanged_BannedInfo {
    const message = { ...baseZtLiveScStatusChanged_BannedInfo } as ZtLiveScStatusChanged_BannedInfo;
    if (object.banReason !== undefined && object.banReason !== null) {
      message.banReason = String(object.banReason);
    } else {
      message.banReason = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveScStatusChanged_BannedInfo>): ZtLiveScStatusChanged_BannedInfo {
    const message = { ...baseZtLiveScStatusChanged_BannedInfo } as ZtLiveScStatusChanged_BannedInfo;
    if (object.banReason !== undefined && object.banReason !== null) {
      message.banReason = object.banReason;
    } else {
      message.banReason = "";
    }
    return message;
  },
  toJSON(message: ZtLiveScStatusChanged_BannedInfo): unknown {
    const obj: any = {};
    message.banReason !== undefined && (obj.banReason = message.banReason);
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