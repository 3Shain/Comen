/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalPkEnd {
  a: string;
  b: CommonStateSignalPkEnd_unknown;
  c: string;
}

const baseCommonStateSignalPkEnd: object = {
  a: "",
  b: 0,
  c: "",
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonStateSignalPkEnd_unknown {
  d = 0,
  e = 1,
  f = 2,
  g = 3,
  h = 4,
  i = 5,
  j = 6,
  k = 7,
  l = 8,
  m = 9,
  n = 10,
  o = 11,
  UNRECOGNIZED = -1,
}

export function commonStateSignalPkEnd_unknownFromJSON(object: any): CommonStateSignalPkEnd_unknown {
  switch (object) {
    case 0:
    case "d":
      return CommonStateSignalPkEnd_unknown.d;
    case 1:
    case "e":
      return CommonStateSignalPkEnd_unknown.e;
    case 2:
    case "f":
      return CommonStateSignalPkEnd_unknown.f;
    case 3:
    case "g":
      return CommonStateSignalPkEnd_unknown.g;
    case 4:
    case "h":
      return CommonStateSignalPkEnd_unknown.h;
    case 5:
    case "i":
      return CommonStateSignalPkEnd_unknown.i;
    case 6:
    case "j":
      return CommonStateSignalPkEnd_unknown.j;
    case 7:
    case "k":
      return CommonStateSignalPkEnd_unknown.k;
    case 8:
    case "l":
      return CommonStateSignalPkEnd_unknown.l;
    case 9:
    case "m":
      return CommonStateSignalPkEnd_unknown.m;
    case 10:
    case "n":
      return CommonStateSignalPkEnd_unknown.n;
    case 11:
    case "o":
      return CommonStateSignalPkEnd_unknown.o;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonStateSignalPkEnd_unknown.UNRECOGNIZED;
  }
}

export function commonStateSignalPkEnd_unknownToJSON(object: CommonStateSignalPkEnd_unknown): string {
  switch (object) {
    case CommonStateSignalPkEnd_unknown.d:
      return "d";
    case CommonStateSignalPkEnd_unknown.e:
      return "e";
    case CommonStateSignalPkEnd_unknown.f:
      return "f";
    case CommonStateSignalPkEnd_unknown.g:
      return "g";
    case CommonStateSignalPkEnd_unknown.h:
      return "h";
    case CommonStateSignalPkEnd_unknown.i:
      return "i";
    case CommonStateSignalPkEnd_unknown.j:
      return "j";
    case CommonStateSignalPkEnd_unknown.k:
      return "k";
    case CommonStateSignalPkEnd_unknown.l:
      return "l";
    case CommonStateSignalPkEnd_unknown.m:
      return "m";
    case CommonStateSignalPkEnd_unknown.n:
      return "n";
    case CommonStateSignalPkEnd_unknown.o:
      return "o";
    default:
      return "UNKNOWN";
  }
}

export const CommonStateSignalPkEnd = {
  encode(message: CommonStateSignalPkEnd, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    writer.uint32(16).int32(message.b);
    writer.uint32(26).string(message.c);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalPkEnd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalPkEnd } as CommonStateSignalPkEnd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b = reader.int32() as any;
          break;
        case 3:
          message.c = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalPkEnd {
    const message = { ...baseCommonStateSignalPkEnd } as CommonStateSignalPkEnd;
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = commonStateSignalPkEnd_unknownFromJSON(object.b);
    } else {
      message.b = 0;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = String(object.c);
    } else {
      message.c = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalPkEnd>): CommonStateSignalPkEnd {
    const message = { ...baseCommonStateSignalPkEnd } as CommonStateSignalPkEnd;
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a;
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b;
    } else {
      message.b = 0;
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c;
    } else {
      message.c = "";
    }
    return message;
  },
  toJSON(message: CommonStateSignalPkEnd): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    message.b !== undefined && (obj.b = commonStateSignalPkEnd_unknownToJSON(message.b));
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