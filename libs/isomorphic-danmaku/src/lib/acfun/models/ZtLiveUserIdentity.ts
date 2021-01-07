/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveUserIdentity {
  managerType: ZtLiveUserIdentity_ManagerType;
}

const baseZtLiveUserIdentity: object = {
  managerType: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum ZtLiveUserIdentity_ManagerType {
  UNKNOWN_MANAGER_TYPE = 0,
  NORMAL = 1,
  UNRECOGNIZED = -1,
}

export function ztLiveUserIdentity_ManagerTypeFromJSON(object: any): ZtLiveUserIdentity_ManagerType {
  switch (object) {
    case 0:
    case "UNKNOWN_MANAGER_TYPE":
      return ZtLiveUserIdentity_ManagerType.UNKNOWN_MANAGER_TYPE;
    case 1:
    case "NORMAL":
      return ZtLiveUserIdentity_ManagerType.NORMAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZtLiveUserIdentity_ManagerType.UNRECOGNIZED;
  }
}

export function ztLiveUserIdentity_ManagerTypeToJSON(object: ZtLiveUserIdentity_ManagerType): string {
  switch (object) {
    case ZtLiveUserIdentity_ManagerType.UNKNOWN_MANAGER_TYPE:
      return "UNKNOWN_MANAGER_TYPE";
    case ZtLiveUserIdentity_ManagerType.NORMAL:
      return "NORMAL";
    default:
      return "UNKNOWN";
  }
}

export const ZtLiveUserIdentity = {
  encode(message: ZtLiveUserIdentity, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.managerType);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveUserIdentity {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveUserIdentity } as ZtLiveUserIdentity;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.managerType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveUserIdentity {
    const message = { ...baseZtLiveUserIdentity } as ZtLiveUserIdentity;
    if (object.managerType !== undefined && object.managerType !== null) {
      message.managerType = ztLiveUserIdentity_ManagerTypeFromJSON(object.managerType);
    } else {
      message.managerType = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveUserIdentity>): ZtLiveUserIdentity {
    const message = { ...baseZtLiveUserIdentity } as ZtLiveUserIdentity;
    if (object.managerType !== undefined && object.managerType !== null) {
      message.managerType = object.managerType;
    } else {
      message.managerType = 0;
    }
    return message;
  },
  toJSON(message: ZtLiveUserIdentity): unknown {
    const obj: any = {};
    message.managerType !== undefined && (obj.managerType = ztLiveUserIdentity_ManagerTypeToJSON(message.managerType));
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