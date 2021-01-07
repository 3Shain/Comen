/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalAuthorChatEnd {
  authorChatId: string;
  endType: CommonStateSignalAuthorChatEnd_EndType;
  endLiveId: string;
}

const baseCommonStateSignalAuthorChatEnd: object = {
  authorChatId: "",
  endType: 0,
  endLiveId: "",
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonStateSignalAuthorChatEnd_EndType {
  UNKNOWN = 0,
  CANCEL_BY_INVITER = 1,
  END_BY_INVITER = 2,
  END_BY_INVITEE = 3,
  INVITEE_REJECT = 4,
  INVITEE_TIMEOUT = 5,
  INVITEE_HEARTBEAT_TIMEOUT = 6,
  INVITER_HEARTBEAT_TIMEOUT = 7,
  PEER_LIVE_STOPPED = 8,
  UNRECOGNIZED = -1,
}

export function commonStateSignalAuthorChatEnd_EndTypeFromJSON(object: any): CommonStateSignalAuthorChatEnd_EndType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return CommonStateSignalAuthorChatEnd_EndType.UNKNOWN;
    case 1:
    case "CANCEL_BY_INVITER":
      return CommonStateSignalAuthorChatEnd_EndType.CANCEL_BY_INVITER;
    case 2:
    case "END_BY_INVITER":
      return CommonStateSignalAuthorChatEnd_EndType.END_BY_INVITER;
    case 3:
    case "END_BY_INVITEE":
      return CommonStateSignalAuthorChatEnd_EndType.END_BY_INVITEE;
    case 4:
    case "INVITEE_REJECT":
      return CommonStateSignalAuthorChatEnd_EndType.INVITEE_REJECT;
    case 5:
    case "INVITEE_TIMEOUT":
      return CommonStateSignalAuthorChatEnd_EndType.INVITEE_TIMEOUT;
    case 6:
    case "INVITEE_HEARTBEAT_TIMEOUT":
      return CommonStateSignalAuthorChatEnd_EndType.INVITEE_HEARTBEAT_TIMEOUT;
    case 7:
    case "INVITER_HEARTBEAT_TIMEOUT":
      return CommonStateSignalAuthorChatEnd_EndType.INVITER_HEARTBEAT_TIMEOUT;
    case 8:
    case "PEER_LIVE_STOPPED":
      return CommonStateSignalAuthorChatEnd_EndType.PEER_LIVE_STOPPED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonStateSignalAuthorChatEnd_EndType.UNRECOGNIZED;
  }
}

export function commonStateSignalAuthorChatEnd_EndTypeToJSON(object: CommonStateSignalAuthorChatEnd_EndType): string {
  switch (object) {
    case CommonStateSignalAuthorChatEnd_EndType.UNKNOWN:
      return "UNKNOWN";
    case CommonStateSignalAuthorChatEnd_EndType.CANCEL_BY_INVITER:
      return "CANCEL_BY_INVITER";
    case CommonStateSignalAuthorChatEnd_EndType.END_BY_INVITER:
      return "END_BY_INVITER";
    case CommonStateSignalAuthorChatEnd_EndType.END_BY_INVITEE:
      return "END_BY_INVITEE";
    case CommonStateSignalAuthorChatEnd_EndType.INVITEE_REJECT:
      return "INVITEE_REJECT";
    case CommonStateSignalAuthorChatEnd_EndType.INVITEE_TIMEOUT:
      return "INVITEE_TIMEOUT";
    case CommonStateSignalAuthorChatEnd_EndType.INVITEE_HEARTBEAT_TIMEOUT:
      return "INVITEE_HEARTBEAT_TIMEOUT";
    case CommonStateSignalAuthorChatEnd_EndType.INVITER_HEARTBEAT_TIMEOUT:
      return "INVITER_HEARTBEAT_TIMEOUT";
    case CommonStateSignalAuthorChatEnd_EndType.PEER_LIVE_STOPPED:
      return "PEER_LIVE_STOPPED";
    default:
      return "UNKNOWN";
  }
}

export const CommonStateSignalAuthorChatEnd = {
  encode(message: CommonStateSignalAuthorChatEnd, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.authorChatId);
    writer.uint32(16).int32(message.endType);
    writer.uint32(26).string(message.endLiveId);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalAuthorChatEnd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalAuthorChatEnd } as CommonStateSignalAuthorChatEnd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorChatId = reader.string();
          break;
        case 2:
          message.endType = reader.int32() as any;
          break;
        case 3:
          message.endLiveId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalAuthorChatEnd {
    const message = { ...baseCommonStateSignalAuthorChatEnd } as CommonStateSignalAuthorChatEnd;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = String(object.authorChatId);
    } else {
      message.authorChatId = "";
    }
    if (object.endType !== undefined && object.endType !== null) {
      message.endType = commonStateSignalAuthorChatEnd_EndTypeFromJSON(object.endType);
    } else {
      message.endType = 0;
    }
    if (object.endLiveId !== undefined && object.endLiveId !== null) {
      message.endLiveId = String(object.endLiveId);
    } else {
      message.endLiveId = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalAuthorChatEnd>): CommonStateSignalAuthorChatEnd {
    const message = { ...baseCommonStateSignalAuthorChatEnd } as CommonStateSignalAuthorChatEnd;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = object.authorChatId;
    } else {
      message.authorChatId = "";
    }
    if (object.endType !== undefined && object.endType !== null) {
      message.endType = object.endType;
    } else {
      message.endType = 0;
    }
    if (object.endLiveId !== undefined && object.endLiveId !== null) {
      message.endLiveId = object.endLiveId;
    } else {
      message.endLiveId = "";
    }
    return message;
  },
  toJSON(message: CommonStateSignalAuthorChatEnd): unknown {
    const obj: any = {};
    message.authorChatId !== undefined && (obj.authorChatId = message.authorChatId);
    message.endType !== undefined && (obj.endType = commonStateSignalAuthorChatEnd_EndTypeToJSON(message.endType));
    message.endLiveId !== undefined && (obj.endLiveId = message.endLiveId);
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