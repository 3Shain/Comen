/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PkPlayerInfo {
  a: ZtLiveUserInfo | undefined;
  b: string;
  c: boolean;
}

const basePkPlayerInfo: object = {
  b: "",
  c: false,
};

export const protobufPackage = 'AcFunDanmu'

export const PkPlayerInfo = {
  encode(message: PkPlayerInfo, writer: Writer = Writer.create()): Writer {
    if (message.a !== undefined && message.a !== undefined) {
      ZtLiveUserInfo.encode(message.a, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.b);
    writer.uint32(24).bool(message.c);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PkPlayerInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePkPlayerInfo } as PkPlayerInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.b = reader.string();
          break;
        case 3:
          message.c = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PkPlayerInfo {
    const message = { ...basePkPlayerInfo } as PkPlayerInfo;
    if (object.a !== undefined && object.a !== null) {
      message.a = ZtLiveUserInfo.fromJSON(object.a);
    } else {
      message.a = undefined;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = String(object.b);
    } else {
      message.b = "";
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = Boolean(object.c);
    } else {
      message.c = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PkPlayerInfo>): PkPlayerInfo {
    const message = { ...basePkPlayerInfo } as PkPlayerInfo;
    if (object.a !== undefined && object.a !== null) {
      message.a = ZtLiveUserInfo.fromPartial(object.a);
    } else {
      message.a = undefined;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b;
    } else {
      message.b = "";
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c;
    } else {
      message.c = false;
    }
    return message;
  },
  toJSON(message: PkPlayerInfo): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a ? ZtLiveUserInfo.toJSON(message.a) : undefined);
    message.b !== undefined && (obj.b = message.b);
    message.c !== undefined && (obj.c = message.c);
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