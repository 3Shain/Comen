/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface FrontendInfo {
  ip: string;
  port: number;
}

const baseFrontendInfo: object = {
  ip: "",
  port: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const FrontendInfo = {
  encode(message: FrontendInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.ip);
    writer.uint32(16).int32(message.port);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): FrontendInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFrontendInfo } as FrontendInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ip = reader.string();
          break;
        case 2:
          message.port = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FrontendInfo {
    const message = { ...baseFrontendInfo } as FrontendInfo;
    if (object.ip !== undefined && object.ip !== null) {
      message.ip = String(object.ip);
    } else {
      message.ip = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = Number(object.port);
    } else {
      message.port = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<FrontendInfo>): FrontendInfo {
    const message = { ...baseFrontendInfo } as FrontendInfo;
    if (object.ip !== undefined && object.ip !== null) {
      message.ip = object.ip;
    } else {
      message.ip = "";
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port;
    } else {
      message.port = 0;
    }
    return message;
  },
  toJSON(message: FrontendInfo): unknown {
    const obj: any = {};
    message.ip !== undefined && (obj.ip = message.ip);
    message.port !== undefined && (obj.port = message.port);
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