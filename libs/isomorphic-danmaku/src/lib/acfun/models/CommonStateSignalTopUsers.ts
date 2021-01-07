/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalTopUsers {
  /**
   * topUser
   */
  user: CommonStateSignalTopUsers_TopUser[];
}

export interface CommonStateSignalTopUsers_TopUser {
  userInfo: ZtLiveUserInfo | undefined;
  customWatchingListData: string;
  displaySendAmount: string;
  anonymousUser: boolean;
}

const baseCommonStateSignalTopUsers: object = {
};

const baseCommonStateSignalTopUsers_TopUser: object = {
  customWatchingListData: "",
  displaySendAmount: "",
  anonymousUser: false,
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalTopUsers = {
  encode(message: CommonStateSignalTopUsers, writer: Writer = Writer.create()): Writer {
    for (const v of message.user) {
      CommonStateSignalTopUsers_TopUser.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalTopUsers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalTopUsers } as CommonStateSignalTopUsers;
    message.user = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user.push(CommonStateSignalTopUsers_TopUser.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalTopUsers {
    const message = { ...baseCommonStateSignalTopUsers } as CommonStateSignalTopUsers;
    message.user = [];
    if (object.user !== undefined && object.user !== null) {
      for (const e of object.user) {
        message.user.push(CommonStateSignalTopUsers_TopUser.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalTopUsers>): CommonStateSignalTopUsers {
    const message = { ...baseCommonStateSignalTopUsers } as CommonStateSignalTopUsers;
    message.user = [];
    if (object.user !== undefined && object.user !== null) {
      for (const e of object.user) {
        message.user.push(CommonStateSignalTopUsers_TopUser.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CommonStateSignalTopUsers): unknown {
    const obj: any = {};
    if (message.user) {
      obj.user = message.user.map(e => e ? CommonStateSignalTopUsers_TopUser.toJSON(e) : undefined);
    } else {
      obj.user = [];
    }
    return obj;
  },
};

export const CommonStateSignalTopUsers_TopUser = {
  encode(message: CommonStateSignalTopUsers_TopUser, writer: Writer = Writer.create()): Writer {
    if (message.userInfo !== undefined && message.userInfo !== undefined) {
      ZtLiveUserInfo.encode(message.userInfo, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(26).string(message.customWatchingListData);
    writer.uint32(34).string(message.displaySendAmount);
    writer.uint32(40).bool(message.anonymousUser);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalTopUsers_TopUser {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalTopUsers_TopUser } as CommonStateSignalTopUsers_TopUser;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userInfo = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.customWatchingListData = reader.string();
          break;
        case 4:
          message.displaySendAmount = reader.string();
          break;
        case 5:
          message.anonymousUser = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalTopUsers_TopUser {
    const message = { ...baseCommonStateSignalTopUsers_TopUser } as CommonStateSignalTopUsers_TopUser;
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = ZtLiveUserInfo.fromJSON(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    if (object.customWatchingListData !== undefined && object.customWatchingListData !== null) {
      message.customWatchingListData = String(object.customWatchingListData);
    } else {
      message.customWatchingListData = "";
    }
    if (object.displaySendAmount !== undefined && object.displaySendAmount !== null) {
      message.displaySendAmount = String(object.displaySendAmount);
    } else {
      message.displaySendAmount = "";
    }
    if (object.anonymousUser !== undefined && object.anonymousUser !== null) {
      message.anonymousUser = Boolean(object.anonymousUser);
    } else {
      message.anonymousUser = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalTopUsers_TopUser>): CommonStateSignalTopUsers_TopUser {
    const message = { ...baseCommonStateSignalTopUsers_TopUser } as CommonStateSignalTopUsers_TopUser;
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = ZtLiveUserInfo.fromPartial(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    if (object.customWatchingListData !== undefined && object.customWatchingListData !== null) {
      message.customWatchingListData = object.customWatchingListData;
    } else {
      message.customWatchingListData = "";
    }
    if (object.displaySendAmount !== undefined && object.displaySendAmount !== null) {
      message.displaySendAmount = object.displaySendAmount;
    } else {
      message.displaySendAmount = "";
    }
    if (object.anonymousUser !== undefined && object.anonymousUser !== null) {
      message.anonymousUser = object.anonymousUser;
    } else {
      message.anonymousUser = false;
    }
    return message;
  },
  toJSON(message: CommonStateSignalTopUsers_TopUser): unknown {
    const obj: any = {};
    message.userInfo !== undefined && (obj.userInfo = message.userInfo ? ZtLiveUserInfo.toJSON(message.userInfo) : undefined);
    message.customWatchingListData !== undefined && (obj.customWatchingListData = message.customWatchingListData);
    message.displaySendAmount !== undefined && (obj.displaySendAmount = message.displaySendAmount);
    message.anonymousUser !== undefined && (obj.anonymousUser = message.anonymousUser);
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