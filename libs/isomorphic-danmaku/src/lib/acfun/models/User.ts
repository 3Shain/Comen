/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface User {
  appId: number;
  uid: Long;
}

const baseUser: object = {
  appId: 0,
  uid: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const User = {
  encode(message: User, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.appId);
    writer.uint32(16).int64(message.uid);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): User {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUser } as User;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appId = reader.int32();
          break;
        case 2:
          message.uid = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): User {
    const message = { ...baseUser } as User;
    if (object.appId !== undefined && object.appId !== null) {
      message.appId = Number(object.appId);
    } else {
      message.appId = 0;
    }
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = Long.fromString(object.uid);
    } else {
      message.uid = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<User>): User {
    const message = { ...baseUser } as User;
    if (object.appId !== undefined && object.appId !== null) {
      message.appId = object.appId;
    } else {
      message.appId = 0;
    }
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = object.uid as Long;
    } else {
      message.uid = Long.ZERO;
    }
    return message;
  },
  toJSON(message: User): unknown {
    const obj: any = {};
    message.appId !== undefined && (obj.appId = message.appId);
    message.uid !== undefined && (obj.uid = (message.uid || Long.ZERO).toString());
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