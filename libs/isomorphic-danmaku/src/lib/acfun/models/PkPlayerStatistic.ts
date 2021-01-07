/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import * as Long from 'long';
import { PkPlayerRoundStatistic } from './PkPlayerRoundStatistic';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PkPlayerStatistic {
  a: ZtLiveUserInfo | undefined;
  b: string;
  c: Long;
  d: PkPlayerRoundStatistic[];
  e: number;
}

const basePkPlayerStatistic: object = {
  b: "",
  c: Long.ZERO,
  e: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const PkPlayerStatistic = {
  encode(message: PkPlayerStatistic, writer: Writer = Writer.create()): Writer {
    if (message.a !== undefined && message.a !== undefined) {
      ZtLiveUserInfo.encode(message.a, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.b);
    writer.uint32(24).int64(message.c);
    for (const v of message.d) {
      PkPlayerRoundStatistic.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(40).int32(message.e);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PkPlayerStatistic {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePkPlayerStatistic } as PkPlayerStatistic;
    message.d = [];
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
          message.c = reader.int64() as Long;
          break;
        case 4:
          message.d.push(PkPlayerRoundStatistic.decode(reader, reader.uint32()));
          break;
        case 5:
          message.e = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PkPlayerStatistic {
    const message = { ...basePkPlayerStatistic } as PkPlayerStatistic;
    message.d = [];
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
      message.c = Long.fromString(object.c);
    } else {
      message.c = Long.ZERO;
    }
    if (object.d !== undefined && object.d !== null) {
      for (const e of object.d) {
        message.d.push(PkPlayerRoundStatistic.fromJSON(e));
      }
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = Number(object.e);
    } else {
      message.e = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PkPlayerStatistic>): PkPlayerStatistic {
    const message = { ...basePkPlayerStatistic } as PkPlayerStatistic;
    message.d = [];
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
      message.c = object.c as Long;
    } else {
      message.c = Long.ZERO;
    }
    if (object.d !== undefined && object.d !== null) {
      for (const e of object.d) {
        message.d.push(PkPlayerRoundStatistic.fromPartial(e));
      }
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = object.e;
    } else {
      message.e = 0;
    }
    return message;
  },
  toJSON(message: PkPlayerStatistic): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a ? ZtLiveUserInfo.toJSON(message.a) : undefined);
    message.b !== undefined && (obj.b = message.b);
    message.c !== undefined && (obj.c = (message.c || Long.ZERO).toString());
    if (message.d) {
      obj.d = message.d.map(e => e ? PkPlayerRoundStatistic.toJSON(e) : undefined);
    } else {
      obj.d = [];
    }
    message.e !== undefined && (obj.e = message.e);
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