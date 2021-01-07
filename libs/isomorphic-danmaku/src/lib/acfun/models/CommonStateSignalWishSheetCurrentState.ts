/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalWishSheetCurrentState {
  a: string;
  b: CommonStateSignalWishSheetCurrentState_WishCurrentState[];
}

export interface CommonStateSignalWishSheetCurrentState_WishCurrentState {
  c: string;
  d: Long;
  e: Long;
  f: Long;
  g: string;
  h: string;
}

const baseCommonStateSignalWishSheetCurrentState: object = {
  a: "",
};

const baseCommonStateSignalWishSheetCurrentState_WishCurrentState: object = {
  c: "",
  d: Long.ZERO,
  e: Long.ZERO,
  f: Long.ZERO,
  g: "",
  h: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalWishSheetCurrentState = {
  encode(message: CommonStateSignalWishSheetCurrentState, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    for (const v of message.b) {
      CommonStateSignalWishSheetCurrentState_WishCurrentState.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalWishSheetCurrentState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalWishSheetCurrentState } as CommonStateSignalWishSheetCurrentState;
    message.b = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b.push(CommonStateSignalWishSheetCurrentState_WishCurrentState.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalWishSheetCurrentState {
    const message = { ...baseCommonStateSignalWishSheetCurrentState } as CommonStateSignalWishSheetCurrentState;
    message.b = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      for (const e of object.b) {
        message.b.push(CommonStateSignalWishSheetCurrentState_WishCurrentState.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalWishSheetCurrentState>): CommonStateSignalWishSheetCurrentState {
    const message = { ...baseCommonStateSignalWishSheetCurrentState } as CommonStateSignalWishSheetCurrentState;
    message.b = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a;
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      for (const e of object.b) {
        message.b.push(CommonStateSignalWishSheetCurrentState_WishCurrentState.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CommonStateSignalWishSheetCurrentState): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    if (message.b) {
      obj.b = message.b.map(e => e ? CommonStateSignalWishSheetCurrentState_WishCurrentState.toJSON(e) : undefined);
    } else {
      obj.b = [];
    }
    return obj;
  },
};

export const CommonStateSignalWishSheetCurrentState_WishCurrentState = {
  encode(message: CommonStateSignalWishSheetCurrentState_WishCurrentState, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.c);
    writer.uint32(16).int64(message.d);
    writer.uint32(24).int64(message.e);
    writer.uint32(32).int64(message.f);
    writer.uint32(42).string(message.g);
    writer.uint32(50).string(message.h);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalWishSheetCurrentState_WishCurrentState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalWishSheetCurrentState_WishCurrentState } as CommonStateSignalWishSheetCurrentState_WishCurrentState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.c = reader.string();
          break;
        case 2:
          message.d = reader.int64() as Long;
          break;
        case 3:
          message.e = reader.int64() as Long;
          break;
        case 4:
          message.f = reader.int64() as Long;
          break;
        case 5:
          message.g = reader.string();
          break;
        case 6:
          message.h = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalWishSheetCurrentState_WishCurrentState {
    const message = { ...baseCommonStateSignalWishSheetCurrentState_WishCurrentState } as CommonStateSignalWishSheetCurrentState_WishCurrentState;
    if (object.c !== undefined && object.c !== null) {
      message.c = String(object.c);
    } else {
      message.c = "";
    }
    if (object.d !== undefined && object.d !== null) {
      message.d = Long.fromString(object.d);
    } else {
      message.d = Long.ZERO;
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = Long.fromString(object.e);
    } else {
      message.e = Long.ZERO;
    }
    if (object.f !== undefined && object.f !== null) {
      message.f = Long.fromString(object.f);
    } else {
      message.f = Long.ZERO;
    }
    if (object.g !== undefined && object.g !== null) {
      message.g = String(object.g);
    } else {
      message.g = "";
    }
    if (object.h !== undefined && object.h !== null) {
      message.h = String(object.h);
    } else {
      message.h = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalWishSheetCurrentState_WishCurrentState>): CommonStateSignalWishSheetCurrentState_WishCurrentState {
    const message = { ...baseCommonStateSignalWishSheetCurrentState_WishCurrentState } as CommonStateSignalWishSheetCurrentState_WishCurrentState;
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c;
    } else {
      message.c = "";
    }
    if (object.d !== undefined && object.d !== null) {
      message.d = object.d as Long;
    } else {
      message.d = Long.ZERO;
    }
    if (object.e !== undefined && object.e !== null) {
      message.e = object.e as Long;
    } else {
      message.e = Long.ZERO;
    }
    if (object.f !== undefined && object.f !== null) {
      message.f = object.f as Long;
    } else {
      message.f = Long.ZERO;
    }
    if (object.g !== undefined && object.g !== null) {
      message.g = object.g;
    } else {
      message.g = "";
    }
    if (object.h !== undefined && object.h !== null) {
      message.h = object.h;
    } else {
      message.h = "";
    }
    return message;
  },
  toJSON(message: CommonStateSignalWishSheetCurrentState_WishCurrentState): unknown {
    const obj: any = {};
    message.c !== undefined && (obj.c = message.c);
    message.d !== undefined && (obj.d = (message.d || Long.ZERO).toString());
    message.e !== undefined && (obj.e = (message.e || Long.ZERO).toString());
    message.f !== undefined && (obj.f = (message.f || Long.ZERO).toString());
    message.g !== undefined && (obj.g = message.g);
    message.h !== undefined && (obj.h = message.h);
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