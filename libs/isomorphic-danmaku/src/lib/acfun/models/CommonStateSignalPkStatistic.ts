/* eslint-disable */
import * as Long from 'long';
import { PkAudienceContributionInfo } from './PkAudienceContributionInfo';
import { PkPlayerStatistic } from './PkPlayerStatistic';
import { PkRoundInfo } from './PkRoundInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalPkStatistic {
  a: string;
  b: Long;
  c: Long;
  d: Long;
  e: boolean;
  f: Long;
  g: Long;
  h: Long;
  i: PkAudienceContributionInfo[];
  j: PkPlayerStatistic[];
  k: PkRoundInfo | undefined;
  l: Long;
}

const baseCommonStateSignalPkStatistic: object = {
  a: "",
  b: Long.ZERO,
  c: Long.ZERO,
  d: Long.ZERO,
  e: false,
  f: Long.ZERO,
  g: Long.ZERO,
  h: Long.ZERO,
  l: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalPkStatistic = {
  encode(message: CommonStateSignalPkStatistic, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    writer.uint32(16).int64(message.b);
    writer.uint32(24).int64(message.c);
    writer.uint32(32).int64(message.d);
    writer.uint32(40).bool(message.e);
    writer.uint32(48).int64(message.f);
    writer.uint32(56).int64(message.g);
    writer.uint32(64).int64(message.h);
    for (const v of message.i) {
      PkAudienceContributionInfo.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.j) {
      PkPlayerStatistic.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.k !== undefined && message.k !== undefined) {
      PkRoundInfo.encode(message.k, writer.uint32(90).fork()).ldelim();
    }
    writer.uint32(96).int64(message.l);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalPkStatistic {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalPkStatistic } as CommonStateSignalPkStatistic;
    message.i = [];
    message.j = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b = reader.int64() as Long;
          break;
        case 3:
          message.c = reader.int64() as Long;
          break;
        case 4:
          message.d = reader.int64() as Long;
          break;
        case 5:
          message.e = reader.bool();
          break;
        case 6:
          message.f = reader.int64() as Long;
          break;
        case 7:
          message.g = reader.int64() as Long;
          break;
        case 8:
          message.h = reader.int64() as Long;
          break;
        case 9:
          message.i.push(PkAudienceContributionInfo.decode(reader, reader.uint32()));
          break;
        case 10:
          message.j.push(PkPlayerStatistic.decode(reader, reader.uint32()));
          break;
        case 11:
          message.k = PkRoundInfo.decode(reader, reader.uint32());
          break;
        case 12:
          message.l = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalPkStatistic {
    const message = { ...baseCommonStateSignalPkStatistic } as CommonStateSignalPkStatistic;
    message.i = [];
    message.j = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = Long.fromString(object.b);
    } else {
      message.b = Long.ZERO;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = Long.fromString(object.c);
    } else {
      message.c = Long.ZERO;
    }
    if (object.d !== undefined && object.d !== null) {
      message.d = Long.fromString(object.d);
    } else {
      message.d = Long.ZERO;
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = Boolean(object.e);
    } else {
      message.e = false;
    }
    if (object.f !== undefined && object.f !== null) {
      message.f = Long.fromString(object.f);
    } else {
      message.f = Long.ZERO;
    }
    if (object.g !== undefined && object.g !== null) {
      message.g = Long.fromString(object.g);
    } else {
      message.g = Long.ZERO;
    }
    if (object.h !== undefined && object.h !== null) {
      message.h = Long.fromString(object.h);
    } else {
      message.h = Long.ZERO;
    }
    if (object.i !== undefined && object.i !== null) {
      for (const e of object.i) {
        message.i.push(PkAudienceContributionInfo.fromJSON(e));
      }
    }
    if (object.j !== undefined && object.j !== null) {
      for (const e of object.j) {
        message.j.push(PkPlayerStatistic.fromJSON(e));
      }
    }
    if (object.k !== undefined && object.k !== null) {
      message.k = PkRoundInfo.fromJSON(object.k);
    } else {
      message.k = undefined;
    }
    if (object.l !== undefined && object.l !== null) {
      message.l = Long.fromString(object.l);
    } else {
      message.l = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalPkStatistic>): CommonStateSignalPkStatistic {
    const message = { ...baseCommonStateSignalPkStatistic } as CommonStateSignalPkStatistic;
    message.i = [];
    message.j = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a;
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b as Long;
    } else {
      message.b = Long.ZERO;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c as Long;
    } else {
      message.c = Long.ZERO;
    }
    if (object.d !== undefined && object.d !== null) {
      message.d = object.d as Long;
    } else {
      message.d = Long.ZERO;
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = object.e;
    } else {
      message.e = false;
    }
    if (object.f !== undefined && object.f !== null) {
      message.f = object.f as Long;
    } else {
      message.f = Long.ZERO;
    }
    if (object.g !== undefined && object.g !== null) {
      message.g = object.g as Long;
    } else {
      message.g = Long.ZERO;
    }
    if (object.h !== undefined && object.h !== null) {
      message.h = object.h as Long;
    } else {
      message.h = Long.ZERO;
    }
    if (object.i !== undefined && object.i !== null) {
      for (const e of object.i) {
        message.i.push(PkAudienceContributionInfo.fromPartial(e));
      }
    }
    if (object.j !== undefined && object.j !== null) {
      for (const e of object.j) {
        message.j.push(PkPlayerStatistic.fromPartial(e));
      }
    }
    if (object.k !== undefined && object.k !== null) {
      message.k = PkRoundInfo.fromPartial(object.k);
    } else {
      message.k = undefined;
    }
    if (object.l !== undefined && object.l !== null) {
      message.l = object.l as Long;
    } else {
      message.l = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonStateSignalPkStatistic): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    message.b !== undefined && (obj.b = (message.b || Long.ZERO).toString());
    message.c !== undefined && (obj.c = (message.c || Long.ZERO).toString());
    message.d !== undefined && (obj.d = (message.d || Long.ZERO).toString());
    message.e !== undefined && (obj.e = message.e);
    message.f !== undefined && (obj.f = (message.f || Long.ZERO).toString());
    message.g !== undefined && (obj.g = (message.g || Long.ZERO).toString());
    message.h !== undefined && (obj.h = (message.h || Long.ZERO).toString());
    if (message.i) {
      obj.i = message.i.map(e => e ? PkAudienceContributionInfo.toJSON(e) : undefined);
    } else {
      obj.i = [];
    }
    if (message.j) {
      obj.j = message.j.map(e => e ? PkPlayerStatistic.toJSON(e) : undefined);
    } else {
      obj.j = [];
    }
    message.k !== undefined && (obj.k = message.k ? PkRoundInfo.toJSON(message.k) : undefined);
    message.l !== undefined && (obj.l = (message.l || Long.ZERO).toString());
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