/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveCsCmd {
  cmdType: string;
  payload: Uint8Array;
  ticket: string;
  liveId: string;
}

export interface ZtLiveCsCmdAck {
  cmdAckType: string;
  errorCode: Long;
  errorMsg: string;
  payload: Uint8Array;
}

const baseZtLiveCsCmd: object = {
  cmdType: "",
  ticket: "",
  liveId: "",
};

const baseZtLiveCsCmdAck: object = {
  cmdAckType: "",
  errorCode: Long.ZERO,
  errorMsg: "",
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveCsCmd = {
  encode(message: ZtLiveCsCmd, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cmdType);
    writer.uint32(18).bytes(message.payload);
    writer.uint32(26).string(message.ticket);
    writer.uint32(34).string(message.liveId);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsCmd } as ZtLiveCsCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cmdType = reader.string();
          break;
        case 2:
          message.payload = reader.bytes();
          break;
        case 3:
          message.ticket = reader.string();
          break;
        case 4:
          message.liveId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveCsCmd {
    const message = { ...baseZtLiveCsCmd } as ZtLiveCsCmd;
    if (object.cmdType !== undefined && object.cmdType !== null) {
      message.cmdType = String(object.cmdType);
    } else {
      message.cmdType = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = bytesFromBase64(object.payload);
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = String(object.ticket);
    } else {
      message.ticket = "";
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = String(object.liveId);
    } else {
      message.liveId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveCsCmd>): ZtLiveCsCmd {
    const message = { ...baseZtLiveCsCmd } as ZtLiveCsCmd;
    if (object.cmdType !== undefined && object.cmdType !== null) {
      message.cmdType = object.cmdType;
    } else {
      message.cmdType = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = new Uint8Array();
    }
    if (object.ticket !== undefined && object.ticket !== null) {
      message.ticket = object.ticket;
    } else {
      message.ticket = "";
    }
    if (object.liveId !== undefined && object.liveId !== null) {
      message.liveId = object.liveId;
    } else {
      message.liveId = "";
    }
    return message;
  },
  toJSON(message: ZtLiveCsCmd): unknown {
    const obj: any = {};
    message.cmdType !== undefined && (obj.cmdType = message.cmdType);
    message.payload !== undefined && (obj.payload = base64FromBytes(message.payload !== undefined ? message.payload : new Uint8Array()));
    message.ticket !== undefined && (obj.ticket = message.ticket);
    message.liveId !== undefined && (obj.liveId = message.liveId);
    return obj;
  },
};

export const ZtLiveCsCmdAck = {
  encode(message: ZtLiveCsCmdAck, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cmdAckType);
    writer.uint32(16).int64(message.errorCode);
    writer.uint32(26).string(message.errorMsg);
    writer.uint32(34).bytes(message.payload);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsCmdAck {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsCmdAck } as ZtLiveCsCmdAck;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cmdAckType = reader.string();
          break;
        case 2:
          message.errorCode = reader.int64() as Long;
          break;
        case 3:
          message.errorMsg = reader.string();
          break;
        case 4:
          message.payload = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveCsCmdAck {
    const message = { ...baseZtLiveCsCmdAck } as ZtLiveCsCmdAck;
    if (object.cmdAckType !== undefined && object.cmdAckType !== null) {
      message.cmdAckType = String(object.cmdAckType);
    } else {
      message.cmdAckType = "";
    }
    if (object.errorCode !== undefined && object.errorCode !== null) {
      message.errorCode = Long.fromString(object.errorCode);
    } else {
      message.errorCode = Long.ZERO;
    }
    if (object.errorMsg !== undefined && object.errorMsg !== null) {
      message.errorMsg = String(object.errorMsg);
    } else {
      message.errorMsg = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = bytesFromBase64(object.payload);
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveCsCmdAck>): ZtLiveCsCmdAck {
    const message = { ...baseZtLiveCsCmdAck } as ZtLiveCsCmdAck;
    if (object.cmdAckType !== undefined && object.cmdAckType !== null) {
      message.cmdAckType = object.cmdAckType;
    } else {
      message.cmdAckType = "";
    }
    if (object.errorCode !== undefined && object.errorCode !== null) {
      message.errorCode = object.errorCode as Long;
    } else {
      message.errorCode = Long.ZERO;
    }
    if (object.errorMsg !== undefined && object.errorMsg !== null) {
      message.errorMsg = object.errorMsg;
    } else {
      message.errorMsg = "";
    }
    if (object.payload !== undefined && object.payload !== null) {
      message.payload = object.payload;
    } else {
      message.payload = new Uint8Array();
    }
    return message;
  },
  toJSON(message: ZtLiveCsCmdAck): unknown {
    const obj: any = {};
    message.cmdAckType !== undefined && (obj.cmdAckType = message.cmdAckType);
    message.errorCode !== undefined && (obj.errorCode = (message.errorCode || Long.ZERO).toString());
    message.errorMsg !== undefined && (obj.errorMsg = message.errorMsg);
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