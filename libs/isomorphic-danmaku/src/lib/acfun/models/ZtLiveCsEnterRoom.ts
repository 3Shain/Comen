/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveCsEnterRoom {
  isAuthor: boolean;
  reconnectCount: number;
  lastErrorCode: number;
  enterRoomAttach: string;
  clientLiveSdkVersion: string;
}

export interface ZtLiveCsEnterRoomAck {
  heartbeatIntervalMs: Long;
}

const baseZtLiveCsEnterRoom: object = {
  isAuthor: false,
  reconnectCount: 0,
  lastErrorCode: 0,
  enterRoomAttach: "",
  clientLiveSdkVersion: "",
};

const baseZtLiveCsEnterRoomAck: object = {
  heartbeatIntervalMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveCsEnterRoom = {
  encode(message: ZtLiveCsEnterRoom, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).bool(message.isAuthor);
    writer.uint32(16).int32(message.reconnectCount);
    writer.uint32(24).int32(message.lastErrorCode);
    writer.uint32(34).string(message.enterRoomAttach);
    writer.uint32(42).string(message.clientLiveSdkVersion);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsEnterRoom {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsEnterRoom } as ZtLiveCsEnterRoom;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.isAuthor = reader.bool();
          break;
        case 2:
          message.reconnectCount = reader.int32();
          break;
        case 3:
          message.lastErrorCode = reader.int32();
          break;
        case 4:
          message.enterRoomAttach = reader.string();
          break;
        case 5:
          message.clientLiveSdkVersion = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveCsEnterRoom {
    const message = { ...baseZtLiveCsEnterRoom } as ZtLiveCsEnterRoom;
    if (object.isAuthor !== undefined && object.isAuthor !== null) {
      message.isAuthor = Boolean(object.isAuthor);
    } else {
      message.isAuthor = false;
    }
    if (object.reconnectCount !== undefined && object.reconnectCount !== null) {
      message.reconnectCount = Number(object.reconnectCount);
    } else {
      message.reconnectCount = 0;
    }
    if (object.lastErrorCode !== undefined && object.lastErrorCode !== null) {
      message.lastErrorCode = Number(object.lastErrorCode);
    } else {
      message.lastErrorCode = 0;
    }
    if (object.enterRoomAttach !== undefined && object.enterRoomAttach !== null) {
      message.enterRoomAttach = String(object.enterRoomAttach);
    } else {
      message.enterRoomAttach = "";
    }
    if (object.clientLiveSdkVersion !== undefined && object.clientLiveSdkVersion !== null) {
      message.clientLiveSdkVersion = String(object.clientLiveSdkVersion);
    } else {
      message.clientLiveSdkVersion = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveCsEnterRoom>): ZtLiveCsEnterRoom {
    const message = { ...baseZtLiveCsEnterRoom } as ZtLiveCsEnterRoom;
    if (object.isAuthor !== undefined && object.isAuthor !== null) {
      message.isAuthor = object.isAuthor;
    } else {
      message.isAuthor = false;
    }
    if (object.reconnectCount !== undefined && object.reconnectCount !== null) {
      message.reconnectCount = object.reconnectCount;
    } else {
      message.reconnectCount = 0;
    }
    if (object.lastErrorCode !== undefined && object.lastErrorCode !== null) {
      message.lastErrorCode = object.lastErrorCode;
    } else {
      message.lastErrorCode = 0;
    }
    if (object.enterRoomAttach !== undefined && object.enterRoomAttach !== null) {
      message.enterRoomAttach = object.enterRoomAttach;
    } else {
      message.enterRoomAttach = "";
    }
    if (object.clientLiveSdkVersion !== undefined && object.clientLiveSdkVersion !== null) {
      message.clientLiveSdkVersion = object.clientLiveSdkVersion;
    } else {
      message.clientLiveSdkVersion = "";
    }
    return message;
  },
  toJSON(message: ZtLiveCsEnterRoom): unknown {
    const obj: any = {};
    message.isAuthor !== undefined && (obj.isAuthor = message.isAuthor);
    message.reconnectCount !== undefined && (obj.reconnectCount = message.reconnectCount);
    message.lastErrorCode !== undefined && (obj.lastErrorCode = message.lastErrorCode);
    message.enterRoomAttach !== undefined && (obj.enterRoomAttach = message.enterRoomAttach);
    message.clientLiveSdkVersion !== undefined && (obj.clientLiveSdkVersion = message.clientLiveSdkVersion);
    return obj;
  },
};

export const ZtLiveCsEnterRoomAck = {
  encode(message: ZtLiveCsEnterRoomAck, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.heartbeatIntervalMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsEnterRoomAck {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsEnterRoomAck } as ZtLiveCsEnterRoomAck;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.heartbeatIntervalMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveCsEnterRoomAck {
    const message = { ...baseZtLiveCsEnterRoomAck } as ZtLiveCsEnterRoomAck;
    if (object.heartbeatIntervalMs !== undefined && object.heartbeatIntervalMs !== null) {
      message.heartbeatIntervalMs = Long.fromString(object.heartbeatIntervalMs);
    } else {
      message.heartbeatIntervalMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveCsEnterRoomAck>): ZtLiveCsEnterRoomAck {
    const message = { ...baseZtLiveCsEnterRoomAck } as ZtLiveCsEnterRoomAck;
    if (object.heartbeatIntervalMs !== undefined && object.heartbeatIntervalMs !== null) {
      message.heartbeatIntervalMs = object.heartbeatIntervalMs as Long;
    } else {
      message.heartbeatIntervalMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: ZtLiveCsEnterRoomAck): unknown {
    const obj: any = {};
    message.heartbeatIntervalMs !== undefined && (obj.heartbeatIntervalMs = (message.heartbeatIntervalMs || Long.ZERO).toString());
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