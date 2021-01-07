/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PkPlayerRoundStatistic {
  a: Long;
  b: number;
}

const basePkPlayerRoundStatistic: object = {
  a: Long.ZERO,
  b: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const PkPlayerRoundStatistic = {
  encode(message: PkPlayerRoundStatistic, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.a);
    writer.uint32(16).int32(message.b);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PkPlayerRoundStatistic {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePkPlayerRoundStatistic } as PkPlayerRoundStatistic;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.int64() as Long;
          break;
        case 2:
          message.b = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PkPlayerRoundStatistic {
    const message = { ...basePkPlayerRoundStatistic } as PkPlayerRoundStatistic;
    if (object.a !== undefined && object.a !== null) {
      message.a = Long.fromString(object.a);
    } else {
      message.a = Long.ZERO;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = Number(object.b);
    } else {
      message.b = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PkPlayerRoundStatistic>): PkPlayerRoundStatistic {
    const message = { ...basePkPlayerRoundStatistic } as PkPlayerRoundStatistic;
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a as Long;
    } else {
      message.a = Long.ZERO;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b;
    } else {
      message.b = 0;
    }
    return message;
  },
  toJSON(message: PkPlayerRoundStatistic): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = (message.a || Long.ZERO).toString());
    message.b !== undefined && (obj.b = message.b);
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