/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface SyncCookie {
  syncOffset: Long;
}

const baseSyncCookie: object = {
  syncOffset: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const SyncCookie = {
  encode(message: SyncCookie, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.syncOffset);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SyncCookie {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSyncCookie } as SyncCookie;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.syncOffset = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SyncCookie {
    const message = { ...baseSyncCookie } as SyncCookie;
    if (object.syncOffset !== undefined && object.syncOffset !== null) {
      message.syncOffset = Long.fromString(object.syncOffset);
    } else {
      message.syncOffset = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SyncCookie>): SyncCookie {
    const message = { ...baseSyncCookie } as SyncCookie;
    if (object.syncOffset !== undefined && object.syncOffset !== null) {
      message.syncOffset = object.syncOffset as Long;
    } else {
      message.syncOffset = Long.ZERO;
    }
    return message;
  },
  toJSON(message: SyncCookie): unknown {
    const obj: any = {};
    message.syncOffset !== undefined && (obj.syncOffset = (message.syncOffset || Long.ZERO).toString());
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