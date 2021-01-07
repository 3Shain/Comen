/* eslint-disable */
import { User } from './User';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface UserInstance {
  user: User | undefined;
  instanceId: Long;
}

const baseUserInstance: object = {
  instanceId: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const UserInstance = {
  encode(message: UserInstance, writer: Writer = Writer.create()): Writer {
    if (message.user !== undefined && message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.instanceId);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UserInstance {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUserInstance } as UserInstance;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = User.decode(reader, reader.uint32());
          break;
        case 2:
          message.instanceId = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UserInstance {
    const message = { ...baseUserInstance } as UserInstance;
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = Long.fromString(object.instanceId);
    } else {
      message.instanceId = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UserInstance>): UserInstance {
    const message = { ...baseUserInstance } as UserInstance;
    if (object.user !== undefined && object.user !== null) {
      message.user = User.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = object.instanceId as Long;
    } else {
      message.instanceId = Long.ZERO;
    }
    return message;
  },
  toJSON(message: UserInstance): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? User.toJSON(message.user) : undefined);
    message.instanceId !== undefined && (obj.instanceId = (message.instanceId || Long.ZERO).toString());
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