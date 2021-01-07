/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalCurrentRedpackList {
  /**
   * redpack
   */
  redpacks: CommonStateSignalCurrentRedpackList_Redpack[];
}

export interface CommonStateSignalCurrentRedpackList_Redpack {
  sender: ZtLiveUserInfo | undefined;
  displayStatus: CommonStateSignalCurrentRedpackList_RedpackDisplayStatus;
  grabBeginTimeMs: Long;
  getTokenLatestTimeMs: Long;
  redPackId: string;
  redpackBizUnit: string;
  redpackAmount: Long;
  settleBeginTime: Long;
}

const baseCommonStateSignalCurrentRedpackList: object = {
};

const baseCommonStateSignalCurrentRedpackList_Redpack: object = {
  displayStatus: 0,
  grabBeginTimeMs: Long.ZERO,
  getTokenLatestTimeMs: Long.ZERO,
  redPackId: "",
  redpackBizUnit: "",
  redpackAmount: Long.ZERO,
  settleBeginTime: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonStateSignalCurrentRedpackList_RedpackDisplayStatus {
  SHOW = 0,
  GET_TOKEN = 1,
  GRAB = 2,
  UNRECOGNIZED = -1,
}

export function commonStateSignalCurrentRedpackList_RedpackDisplayStatusFromJSON(object: any): CommonStateSignalCurrentRedpackList_RedpackDisplayStatus {
  switch (object) {
    case 0:
    case "SHOW":
      return CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.SHOW;
    case 1:
    case "GET_TOKEN":
      return CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.GET_TOKEN;
    case 2:
    case "GRAB":
      return CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.GRAB;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.UNRECOGNIZED;
  }
}

export function commonStateSignalCurrentRedpackList_RedpackDisplayStatusToJSON(object: CommonStateSignalCurrentRedpackList_RedpackDisplayStatus): string {
  switch (object) {
    case CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.SHOW:
      return "SHOW";
    case CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.GET_TOKEN:
      return "GET_TOKEN";
    case CommonStateSignalCurrentRedpackList_RedpackDisplayStatus.GRAB:
      return "GRAB";
    default:
      return "UNKNOWN";
  }
}

export const CommonStateSignalCurrentRedpackList = {
  encode(message: CommonStateSignalCurrentRedpackList, writer: Writer = Writer.create()): Writer {
    for (const v of message.redpacks) {
      CommonStateSignalCurrentRedpackList_Redpack.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalCurrentRedpackList {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalCurrentRedpackList } as CommonStateSignalCurrentRedpackList;
    message.redpacks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redpacks.push(CommonStateSignalCurrentRedpackList_Redpack.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalCurrentRedpackList {
    const message = { ...baseCommonStateSignalCurrentRedpackList } as CommonStateSignalCurrentRedpackList;
    message.redpacks = [];
    if (object.redpacks !== undefined && object.redpacks !== null) {
      for (const e of object.redpacks) {
        message.redpacks.push(CommonStateSignalCurrentRedpackList_Redpack.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalCurrentRedpackList>): CommonStateSignalCurrentRedpackList {
    const message = { ...baseCommonStateSignalCurrentRedpackList } as CommonStateSignalCurrentRedpackList;
    message.redpacks = [];
    if (object.redpacks !== undefined && object.redpacks !== null) {
      for (const e of object.redpacks) {
        message.redpacks.push(CommonStateSignalCurrentRedpackList_Redpack.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CommonStateSignalCurrentRedpackList): unknown {
    const obj: any = {};
    if (message.redpacks) {
      obj.redpacks = message.redpacks.map(e => e ? CommonStateSignalCurrentRedpackList_Redpack.toJSON(e) : undefined);
    } else {
      obj.redpacks = [];
    }
    return obj;
  },
};

export const CommonStateSignalCurrentRedpackList_Redpack = {
  encode(message: CommonStateSignalCurrentRedpackList_Redpack, writer: Writer = Writer.create()): Writer {
    if (message.sender !== undefined && message.sender !== undefined) {
      ZtLiveUserInfo.encode(message.sender, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.displayStatus);
    writer.uint32(24).int64(message.grabBeginTimeMs);
    writer.uint32(32).int64(message.getTokenLatestTimeMs);
    writer.uint32(42).string(message.redPackId);
    writer.uint32(50).string(message.redpackBizUnit);
    writer.uint32(56).int64(message.redpackAmount);
    writer.uint32(64).int64(message.settleBeginTime);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalCurrentRedpackList_Redpack {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalCurrentRedpackList_Redpack } as CommonStateSignalCurrentRedpackList_Redpack;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.displayStatus = reader.int32() as any;
          break;
        case 3:
          message.grabBeginTimeMs = reader.int64() as Long;
          break;
        case 4:
          message.getTokenLatestTimeMs = reader.int64() as Long;
          break;
        case 5:
          message.redPackId = reader.string();
          break;
        case 6:
          message.redpackBizUnit = reader.string();
          break;
        case 7:
          message.redpackAmount = reader.int64() as Long;
          break;
        case 8:
          message.settleBeginTime = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalCurrentRedpackList_Redpack {
    const message = { ...baseCommonStateSignalCurrentRedpackList_Redpack } as CommonStateSignalCurrentRedpackList_Redpack;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = ZtLiveUserInfo.fromJSON(object.sender);
    } else {
      message.sender = undefined;
    }
    if (object.displayStatus !== undefined && object.displayStatus !== null) {
      message.displayStatus = commonStateSignalCurrentRedpackList_RedpackDisplayStatusFromJSON(object.displayStatus);
    } else {
      message.displayStatus = 0;
    }
    if (object.grabBeginTimeMs !== undefined && object.grabBeginTimeMs !== null) {
      message.grabBeginTimeMs = Long.fromString(object.grabBeginTimeMs);
    } else {
      message.grabBeginTimeMs = Long.ZERO;
    }
    if (object.getTokenLatestTimeMs !== undefined && object.getTokenLatestTimeMs !== null) {
      message.getTokenLatestTimeMs = Long.fromString(object.getTokenLatestTimeMs);
    } else {
      message.getTokenLatestTimeMs = Long.ZERO;
    }
    if (object.redPackId !== undefined && object.redPackId !== null) {
      message.redPackId = String(object.redPackId);
    } else {
      message.redPackId = "";
    }
    if (object.redpackBizUnit !== undefined && object.redpackBizUnit !== null) {
      message.redpackBizUnit = String(object.redpackBizUnit);
    } else {
      message.redpackBizUnit = "";
    }
    if (object.redpackAmount !== undefined && object.redpackAmount !== null) {
      message.redpackAmount = Long.fromString(object.redpackAmount);
    } else {
      message.redpackAmount = Long.ZERO;
    }
    if (object.settleBeginTime !== undefined && object.settleBeginTime !== null) {
      message.settleBeginTime = Long.fromString(object.settleBeginTime);
    } else {
      message.settleBeginTime = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalCurrentRedpackList_Redpack>): CommonStateSignalCurrentRedpackList_Redpack {
    const message = { ...baseCommonStateSignalCurrentRedpackList_Redpack } as CommonStateSignalCurrentRedpackList_Redpack;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = ZtLiveUserInfo.fromPartial(object.sender);
    } else {
      message.sender = undefined;
    }
    if (object.displayStatus !== undefined && object.displayStatus !== null) {
      message.displayStatus = object.displayStatus;
    } else {
      message.displayStatus = 0;
    }
    if (object.grabBeginTimeMs !== undefined && object.grabBeginTimeMs !== null) {
      message.grabBeginTimeMs = object.grabBeginTimeMs as Long;
    } else {
      message.grabBeginTimeMs = Long.ZERO;
    }
    if (object.getTokenLatestTimeMs !== undefined && object.getTokenLatestTimeMs !== null) {
      message.getTokenLatestTimeMs = object.getTokenLatestTimeMs as Long;
    } else {
      message.getTokenLatestTimeMs = Long.ZERO;
    }
    if (object.redPackId !== undefined && object.redPackId !== null) {
      message.redPackId = object.redPackId;
    } else {
      message.redPackId = "";
    }
    if (object.redpackBizUnit !== undefined && object.redpackBizUnit !== null) {
      message.redpackBizUnit = object.redpackBizUnit;
    } else {
      message.redpackBizUnit = "";
    }
    if (object.redpackAmount !== undefined && object.redpackAmount !== null) {
      message.redpackAmount = object.redpackAmount as Long;
    } else {
      message.redpackAmount = Long.ZERO;
    }
    if (object.settleBeginTime !== undefined && object.settleBeginTime !== null) {
      message.settleBeginTime = object.settleBeginTime as Long;
    } else {
      message.settleBeginTime = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonStateSignalCurrentRedpackList_Redpack): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender ? ZtLiveUserInfo.toJSON(message.sender) : undefined);
    message.displayStatus !== undefined && (obj.displayStatus = commonStateSignalCurrentRedpackList_RedpackDisplayStatusToJSON(message.displayStatus));
    message.grabBeginTimeMs !== undefined && (obj.grabBeginTimeMs = (message.grabBeginTimeMs || Long.ZERO).toString());
    message.getTokenLatestTimeMs !== undefined && (obj.getTokenLatestTimeMs = (message.getTokenLatestTimeMs || Long.ZERO).toString());
    message.redPackId !== undefined && (obj.redPackId = message.redPackId);
    message.redpackBizUnit !== undefined && (obj.redpackBizUnit = message.redpackBizUnit);
    message.redpackAmount !== undefined && (obj.redpackAmount = (message.redpackAmount || Long.ZERO).toString());
    message.settleBeginTime !== undefined && (obj.settleBeginTime = (message.settleBeginTime || Long.ZERO).toString());
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