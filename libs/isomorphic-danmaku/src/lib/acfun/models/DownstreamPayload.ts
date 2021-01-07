/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface DownstreamPayload {
  command: string;
  seqId: Long;
  errorCode: number;
  payloadData: Uint8Array;
  errorMsg: string;
  errorData: Uint8Array;
  subBiz: string;
}

const baseDownstreamPayload: object = {
  command: "",
  seqId: Long.ZERO,
  errorCode: 0,
  errorMsg: "",
  subBiz: "",
};

export const protobufPackage = 'AcFunDanmu'

export const DownstreamPayload = {
  encode(message: DownstreamPayload, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.command);
    writer.uint32(16).int64(message.seqId);
    writer.uint32(24).int32(message.errorCode);
    writer.uint32(34).bytes(message.payloadData);
    writer.uint32(42).string(message.errorMsg);
    writer.uint32(50).bytes(message.errorData);
    writer.uint32(58).string(message.subBiz);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DownstreamPayload {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDownstreamPayload } as DownstreamPayload;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.command = reader.string();
          break;
        case 2:
          message.seqId = reader.int64() as Long;
          break;
        case 3:
          message.errorCode = reader.int32();
          break;
        case 4:
          message.payloadData = reader.bytes();
          break;
        case 5:
          message.errorMsg = reader.string();
          break;
        case 6:
          message.errorData = reader.bytes();
          break;
        case 7:
          message.subBiz = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DownstreamPayload {
    const message = { ...baseDownstreamPayload } as DownstreamPayload;
    if (object.command !== undefined && object.command !== null) {
      message.command = String(object.command);
    } else {
      message.command = "";
    }
    if (object.seqId !== undefined && object.seqId !== null) {
      message.seqId = Long.fromString(object.seqId);
    } else {
      message.seqId = Long.ZERO;
    }
    if (object.errorCode !== undefined && object.errorCode !== null) {
      message.errorCode = Number(object.errorCode);
    } else {
      message.errorCode = 0;
    }
    if (object.payloadData !== undefined && object.payloadData !== null) {
      message.payloadData = bytesFromBase64(object.payloadData);
    }
    if (object.errorMsg !== undefined && object.errorMsg !== null) {
      message.errorMsg = String(object.errorMsg);
    } else {
      message.errorMsg = "";
    }
    if (object.errorData !== undefined && object.errorData !== null) {
      message.errorData = bytesFromBase64(object.errorData);
    }
    if (object.subBiz !== undefined && object.subBiz !== null) {
      message.subBiz = String(object.subBiz);
    } else {
      message.subBiz = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<DownstreamPayload>): DownstreamPayload {
    const message = { ...baseDownstreamPayload } as DownstreamPayload;
    if (object.command !== undefined && object.command !== null) {
      message.command = object.command;
    } else {
      message.command = "";
    }
    if (object.seqId !== undefined && object.seqId !== null) {
      message.seqId = object.seqId as Long;
    } else {
      message.seqId = Long.ZERO;
    }
    if (object.errorCode !== undefined && object.errorCode !== null) {
      message.errorCode = object.errorCode;
    } else {
      message.errorCode = 0;
    }
    if (object.payloadData !== undefined && object.payloadData !== null) {
      message.payloadData = object.payloadData;
    } else {
      message.payloadData = new Uint8Array();
    }
    if (object.errorMsg !== undefined && object.errorMsg !== null) {
      message.errorMsg = object.errorMsg;
    } else {
      message.errorMsg = "";
    }
    if (object.errorData !== undefined && object.errorData !== null) {
      message.errorData = object.errorData;
    } else {
      message.errorData = new Uint8Array();
    }
    if (object.subBiz !== undefined && object.subBiz !== null) {
      message.subBiz = object.subBiz;
    } else {
      message.subBiz = "";
    }
    return message;
  },
  toJSON(message: DownstreamPayload): unknown {
    const obj: any = {};
    message.command !== undefined && (obj.command = message.command);
    message.seqId !== undefined && (obj.seqId = (message.seqId || Long.ZERO).toString());
    message.errorCode !== undefined && (obj.errorCode = message.errorCode);
    message.payloadData !== undefined && (obj.payloadData = base64FromBytes(message.payloadData !== undefined ? message.payloadData : new Uint8Array()));
    message.errorMsg !== undefined && (obj.errorMsg = message.errorMsg);
    message.errorData !== undefined && (obj.errorData = base64FromBytes(message.errorData !== undefined ? message.errorData : new Uint8Array()));
    message.subBiz !== undefined && (obj.subBiz = message.subBiz);
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