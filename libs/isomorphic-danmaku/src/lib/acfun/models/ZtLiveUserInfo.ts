/* eslint-disable */
import * as Long from 'long';
import { ImageCdnNode } from './ImageCdnNode';
import { ZtLiveUserIdentity } from './ZtLiveUserIdentity';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveUserInfo {
  userId: Long;
  nickname: string;
  avatar: ImageCdnNode[];
  /**
   *  bizCustomInfo
   */
  badge: string;
  userIdentity: ZtLiveUserIdentity | undefined;
}

const baseZtLiveUserInfo: object = {
  userId: Long.ZERO,
  nickname: "",
  badge: "",
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveUserInfo = {
  encode(message: ZtLiveUserInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(18).string(message.nickname);
    for (const v of message.avatar) {
      ImageCdnNode.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(34).string(message.badge);
    if (message.userIdentity !== undefined && message.userIdentity !== undefined) {
      ZtLiveUserIdentity.encode(message.userIdentity, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveUserInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveUserInfo } as ZtLiveUserInfo;
    message.avatar = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.int64() as Long;
          break;
        case 2:
          message.nickname = reader.string();
          break;
        case 3:
          message.avatar.push(ImageCdnNode.decode(reader, reader.uint32()));
          break;
        case 4:
          message.badge = reader.string();
          break;
        case 5:
          message.userIdentity = ZtLiveUserIdentity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveUserInfo {
    const message = { ...baseZtLiveUserInfo } as ZtLiveUserInfo;
    message.avatar = [];
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Long.fromString(object.userId);
    } else {
      message.userId = Long.ZERO;
    }
    if (object.nickname !== undefined && object.nickname !== null) {
      message.nickname = String(object.nickname);
    } else {
      message.nickname = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      for (const e of object.avatar) {
        message.avatar.push(ImageCdnNode.fromJSON(e));
      }
    }
    if (object.badge !== undefined && object.badge !== null) {
      message.badge = String(object.badge);
    } else {
      message.badge = "";
    }
    if (object.userIdentity !== undefined && object.userIdentity !== null) {
      message.userIdentity = ZtLiveUserIdentity.fromJSON(object.userIdentity);
    } else {
      message.userIdentity = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveUserInfo>): ZtLiveUserInfo {
    const message = { ...baseZtLiveUserInfo } as ZtLiveUserInfo;
    message.avatar = [];
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId as Long;
    } else {
      message.userId = Long.ZERO;
    }
    if (object.nickname !== undefined && object.nickname !== null) {
      message.nickname = object.nickname;
    } else {
      message.nickname = "";
    }
    if (object.avatar !== undefined && object.avatar !== null) {
      for (const e of object.avatar) {
        message.avatar.push(ImageCdnNode.fromPartial(e));
      }
    }
    if (object.badge !== undefined && object.badge !== null) {
      message.badge = object.badge;
    } else {
      message.badge = "";
    }
    if (object.userIdentity !== undefined && object.userIdentity !== null) {
      message.userIdentity = ZtLiveUserIdentity.fromPartial(object.userIdentity);
    } else {
      message.userIdentity = undefined;
    }
    return message;
  },
  toJSON(message: ZtLiveUserInfo): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = (message.userId || Long.ZERO).toString());
    message.nickname !== undefined && (obj.nickname = message.nickname);
    if (message.avatar) {
      obj.avatar = message.avatar.map(e => e ? ImageCdnNode.toJSON(e) : undefined);
    } else {
      obj.avatar = [];
    }
    message.badge !== undefined && (obj.badge = message.badge);
    message.userIdentity !== undefined && (obj.userIdentity = message.userIdentity ? ZtLiveUserIdentity.toJSON(message.userIdentity) : undefined);
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