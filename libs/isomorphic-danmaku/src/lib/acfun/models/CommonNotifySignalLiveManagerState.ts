/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonNotifySignalLiveManagerState {
  state: CommonNotifySignalLiveManagerState_ManagerState;
}

const baseCommonNotifySignalLiveManagerState: object = {
  state: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonNotifySignalLiveManagerState_ManagerState {
  MANAGER_STATE_UNKNOWN = 0,
  MANAGER_ADDED = 1,
  MANAGER_REMOVED = 2,
  IS_MANAGER = 3,
  UNRECOGNIZED = -1,
}

export function commonNotifySignalLiveManagerState_ManagerStateFromJSON(object: any): CommonNotifySignalLiveManagerState_ManagerState {
  switch (object) {
    case 0:
    case "MANAGER_STATE_UNKNOWN":
      return CommonNotifySignalLiveManagerState_ManagerState.MANAGER_STATE_UNKNOWN;
    case 1:
    case "MANAGER_ADDED":
      return CommonNotifySignalLiveManagerState_ManagerState.MANAGER_ADDED;
    case 2:
    case "MANAGER_REMOVED":
      return CommonNotifySignalLiveManagerState_ManagerState.MANAGER_REMOVED;
    case 3:
    case "IS_MANAGER":
      return CommonNotifySignalLiveManagerState_ManagerState.IS_MANAGER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonNotifySignalLiveManagerState_ManagerState.UNRECOGNIZED;
  }
}

export function commonNotifySignalLiveManagerState_ManagerStateToJSON(object: CommonNotifySignalLiveManagerState_ManagerState): string {
  switch (object) {
    case CommonNotifySignalLiveManagerState_ManagerState.MANAGER_STATE_UNKNOWN:
      return "MANAGER_STATE_UNKNOWN";
    case CommonNotifySignalLiveManagerState_ManagerState.MANAGER_ADDED:
      return "MANAGER_ADDED";
    case CommonNotifySignalLiveManagerState_ManagerState.MANAGER_REMOVED:
      return "MANAGER_REMOVED";
    case CommonNotifySignalLiveManagerState_ManagerState.IS_MANAGER:
      return "IS_MANAGER";
    default:
      return "UNKNOWN";
  }
}

export const CommonNotifySignalLiveManagerState = {
  encode(message: CommonNotifySignalLiveManagerState, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.state);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonNotifySignalLiveManagerState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonNotifySignalLiveManagerState } as CommonNotifySignalLiveManagerState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonNotifySignalLiveManagerState {
    const message = { ...baseCommonNotifySignalLiveManagerState } as CommonNotifySignalLiveManagerState;
    if (object.state !== undefined && object.state !== null) {
      message.state = commonNotifySignalLiveManagerState_ManagerStateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonNotifySignalLiveManagerState>): CommonNotifySignalLiveManagerState {
    const message = { ...baseCommonNotifySignalLiveManagerState } as CommonNotifySignalLiveManagerState;
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    return message;
  },
  toJSON(message: CommonNotifySignalLiveManagerState): unknown {
    const obj: any = {};
    message.state !== undefined && (obj.state = commonNotifySignalLiveManagerState_ManagerStateToJSON(message.state));
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