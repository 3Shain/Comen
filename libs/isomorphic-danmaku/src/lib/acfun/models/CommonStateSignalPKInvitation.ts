/* eslint-disable */
import { PkPlayerInfo } from './PkPlayerInfo';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalPKInvitation {
  a: string;
  b: PkPlayerInfo | undefined;
  c: Long;
}

const baseCommonStateSignalPKInvitation: object = {
  a: "",
  c: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalPKInvitation = {
  encode(message: CommonStateSignalPKInvitation, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    if (message.b !== undefined && message.b !== undefined) {
      PkPlayerInfo.encode(message.b, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int64(message.c);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalPKInvitation {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalPKInvitation } as CommonStateSignalPKInvitation;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b = PkPlayerInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.c = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalPKInvitation {
    const message = { ...baseCommonStateSignalPKInvitation } as CommonStateSignalPKInvitation;
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = PkPlayerInfo.fromJSON(object.b);
    } else {
      message.b = undefined;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = Long.fromString(object.c);
    } else {
      message.c = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalPKInvitation>): CommonStateSignalPKInvitation {
    const message = { ...baseCommonStateSignalPKInvitation } as CommonStateSignalPKInvitation;
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a;
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = PkPlayerInfo.fromPartial(object.b);
    } else {
      message.b = undefined;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c as Long;
    } else {
      message.c = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonStateSignalPKInvitation): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    message.b !== undefined && (obj.b = message.b ? PkPlayerInfo.toJSON(message.b) : undefined);
    message.c !== undefined && (obj.c = (message.c || Long.ZERO).toString());
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