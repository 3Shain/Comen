/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalPKSoundConfigChanged {
  a: string;
  b: CommonStateSignalPKSoundConfigChanged_unknown;
}

const baseCommonStateSignalPKSoundConfigChanged: object = {
  a: "",
  b: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonStateSignalPKSoundConfigChanged_unknown {
  c = 0,
  d = 1,
  e = 2,
  UNRECOGNIZED = -1,
}

export function commonStateSignalPKSoundConfigChanged_unknownFromJSON(object: any): CommonStateSignalPKSoundConfigChanged_unknown {
  switch (object) {
    case 0:
    case "c":
      return CommonStateSignalPKSoundConfigChanged_unknown.c;
    case 1:
    case "d":
      return CommonStateSignalPKSoundConfigChanged_unknown.d;
    case 2:
    case "e":
      return CommonStateSignalPKSoundConfigChanged_unknown.e;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonStateSignalPKSoundConfigChanged_unknown.UNRECOGNIZED;
  }
}

export function commonStateSignalPKSoundConfigChanged_unknownToJSON(object: CommonStateSignalPKSoundConfigChanged_unknown): string {
  switch (object) {
    case CommonStateSignalPKSoundConfigChanged_unknown.c:
      return "c";
    case CommonStateSignalPKSoundConfigChanged_unknown.d:
      return "d";
    case CommonStateSignalPKSoundConfigChanged_unknown.e:
      return "e";
    default:
      return "UNKNOWN";
  }
}

export const CommonStateSignalPKSoundConfigChanged = {
  encode(message: CommonStateSignalPKSoundConfigChanged, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    writer.uint32(16).int32(message.b);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalPKSoundConfigChanged {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalPKSoundConfigChanged } as CommonStateSignalPKSoundConfigChanged;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalPKSoundConfigChanged {
    const message = { ...baseCommonStateSignalPKSoundConfigChanged } as CommonStateSignalPKSoundConfigChanged;
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = commonStateSignalPKSoundConfigChanged_unknownFromJSON(object.b);
    } else {
      message.b = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalPKSoundConfigChanged>): CommonStateSignalPKSoundConfigChanged {
    const message = { ...baseCommonStateSignalPKSoundConfigChanged } as CommonStateSignalPKSoundConfigChanged;
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
    return message;
  },
  toJSON(message: CommonStateSignalPKSoundConfigChanged): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    message.b !== undefined && (obj.b = commonStateSignalPKSoundConfigChanged_unknownToJSON(message.b));
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