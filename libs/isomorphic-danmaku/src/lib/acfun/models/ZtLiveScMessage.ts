/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveScMessage {
  messageType: string;
  compressionType: ZtLiveScMessage_CompressionType;
  payload: Uint8Array;
  liveId: string;
  ticket: string;
  serverTimestampMs: Long;
}

const baseZtLiveScMessage: object = {
  messageType: "",
  compressionType: 0,
  liveId: "",
  ticket: "",
  serverTimestampMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export enum ZtLiveScMessage_CompressionType {
  UNKNOWN = 0,
  NONE = 1,
  GZIP = 2,
  UNRECOGNIZED = -1,
}

export function ztLiveScMessage_CompressionTypeFromJSON(object: any): ZtLiveScMessage_CompressionType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ZtLiveScMessage_CompressionType.UNKNOWN;
    case 1:
    case "NONE":
      return ZtLiveScMessage_CompressionType.NONE;
    case 2:
    case "GZIP":
      return ZtLiveScMessage_CompressionType.GZIP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZtLiveScMessage_CompressionType.UNRECOGNIZED;
  }
}

export function ztLiveScMessage_CompressionTypeToJSON(object: ZtLiveScMessage_CompressionType): string {
  switch (object) {
    case ZtLiveScMessage_CompressionType.UNKNOWN:
      return "UNKNOWN";
    case ZtLiveScMessage_CompressionType.NONE:
      return "NONE";
    case ZtLiveScMessage_CompressionType.GZIP:
      return "GZIP";
    default:
      return "UNKNOWN";
  }
}

export const ZtLiveScMessage = {
  encode(message: ZtLiveScMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.messageType);
    writer.uint32(16).int32(message.compressionType);
    writer.uint32(26).bytes(message.payload);
    writer.uint32(34).string(message.liveId);
    writer.uint32(42).string(message.ticket);
    writer.uint32(48).int64(message.serverTimestampMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveScMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveScMessage } as ZtLiveScMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageType = reader.string();
          break;
        case 2:
          message.compressionType = reader.int32() as any;
          break;
        case 3:
          message.payload = reader.bytes();
          break;
        case 4:
          message.liveId = reader.string();
          break;
        case 5:
          message.ticket = reader.string();
          break;
        case 6:
          message.serverTimestampMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveScMessage {
    const message = { ...baseZtLiveScMessage } as ZtLiveScMessage;
    if (object.messageType !== undefined && object.messageType !== null) {
      message.messageType = String(object.messageType);
    } else {
      message.messageType = "";
    }
    if (object.compressionType !== undefined && object.compressionType !== null) {
      message.compressionType = ztLiveScMessage_CompressionTypeFromJSON(object.compressionType);
    } else {
      message.compressionType = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = bytesFromBase64(object.payload);
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = String(object.liveId);
    } else {
      message.liveId = "";
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    if (object.serverTimestampMs !== undefined && object.serverTimestampMs !== null) {
      message.serverTimestampMs = Long.fromString(object.serverTimestampMs);
    } else {
      message.serverTimestampMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveScMessage>): ZtLiveScMessage {
    const message = { ...baseZtLiveScMessage } as ZtLiveScMessage;
    if (object.messageType !== undefined && object.messageType !== null) {
      message.messageType = object.messageType;
    } else {
      message.messageType = "";
    }
    if (object.compressionType !== undefined && object.compressionType !== null) {
      message.compressionType = object.compressionType;
    } else {
      message.compressionType = 0;
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = new Uint8Array();
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = object.liveId;
    } else {
      message.liveId = "";
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    if (object.serverTimestampMs !== undefined && object.serverTimestampMs !== null) {
      message.serverTimestampMs = object.serverTimestampMs as Long;
    } else {
      message.serverTimestampMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: ZtLiveScMessage): unknown {
    const obj: any = {};
    message.messageType !== undefined && (obj.messageType = message.messageType);
    message.compressionType !== undefined && (obj.compressionType = ztLiveScMessage_CompressionTypeToJSON(message.compressionType));
    message.payload !== undefined && (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.liveId !== undefined && (obj.liveId = message.liveId);
    message.ticket !== undefined && (obj.ticket = message.ticket);
    message.serverTimestampMs !== undefined && (obj.serverTimestampMs = (message.serverTimestampMs || Long.ZERO).toString());
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
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