/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveNotifySignalItem {
  signalType: string;
  payload: Uint8Array;
}

const baseZtLiveNotifySignalItem: object = {
  signalType: "",
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveNotifySignalItem = {
  encode(message: ZtLiveNotifySignalItem, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.signalType);
    writer.uint32(18).bytes(message.payload);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveNotifySignalItem {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveNotifySignalItem } as ZtLiveNotifySignalItem;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signalType = reader.string();
          break;
        case 2:
          message.payload = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveNotifySignalItem {
    const message = { ...baseZtLiveNotifySignalItem } as ZtLiveNotifySignalItem;
    if (object.signalType !== undefined && object.signalType !== null) {
      message.signalType = String(object.signalType);
    } else {
      message.signalType = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = bytesFromBase64(object.payload);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveNotifySignalItem>): ZtLiveNotifySignalItem {
    const message = { ...baseZtLiveNotifySignalItem } as ZtLiveNotifySignalItem;
    if (object.signalType !== undefined && object.signalType !== null) {
      message.signalType = object.signalType;
    } else {
      message.signalType = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = new Uint8Array();
    }
    return message;
  },
  toJSON(message: ZtLiveNotifySignalItem): unknown {
    const obj: any = {};
    message.signalType !== undefined && (obj.signalType = message.signalType);
    message.payload !== undefined && (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
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