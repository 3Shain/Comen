/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface PushServiceToken {
  pushType: PushServiceToken_PushType;
  token: Uint8Array;
  isPassThrough: boolean;
}

const basePushServiceToken: object = {
  pushType: 0,
  isPassThrough: false,
};

export const protobufPackage = 'AcFunDanmu'

export enum PushServiceToken_PushType {
  kPushTypeInvalid = 0,
  kPushTypeAPNS = 1,
  kPushTypeXmPush = 2,
  kPushTypeJgPush = 3,
  kPushTypeGtPUsh = 4,
  kPushTypeOpPush = 5,
  kPushTYpeVvPush = 6,
  kPushTypeHwPush = 7,
  kPushTYpeFcm = 8,
  UNRECOGNIZED = -1,
}

export function pushServiceToken_PushTypeFromJSON(object: any): PushServiceToken_PushType {
  switch (object) {
    case 0:
    case "kPushTypeInvalid":
      return PushServiceToken_PushType.kPushTypeInvalid;
    case 1:
    case "kPushTypeAPNS":
      return PushServiceToken_PushType.kPushTypeAPNS;
    case 2:
    case "kPushTypeXmPush":
      return PushServiceToken_PushType.kPushTypeXmPush;
    case 3:
    case "kPushTypeJgPush":
      return PushServiceToken_PushType.kPushTypeJgPush;
    case 4:
    case "kPushTypeGtPUsh":
      return PushServiceToken_PushType.kPushTypeGtPUsh;
    case 5:
    case "kPushTypeOpPush":
      return PushServiceToken_PushType.kPushTypeOpPush;
    case 6:
    case "kPushTYpeVvPush":
      return PushServiceToken_PushType.kPushTYpeVvPush;
    case 7:
    case "kPushTypeHwPush":
      return PushServiceToken_PushType.kPushTypeHwPush;
    case 8:
    case "kPushTYpeFcm":
      return PushServiceToken_PushType.kPushTYpeFcm;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PushServiceToken_PushType.UNRECOGNIZED;
  }
}

export function pushServiceToken_PushTypeToJSON(object: PushServiceToken_PushType): string {
  switch (object) {
    case PushServiceToken_PushType.kPushTypeInvalid:
      return "kPushTypeInvalid";
    case PushServiceToken_PushType.kPushTypeAPNS:
      return "kPushTypeAPNS";
    case PushServiceToken_PushType.kPushTypeXmPush:
      return "kPushTypeXmPush";
    case PushServiceToken_PushType.kPushTypeJgPush:
      return "kPushTypeJgPush";
    case PushServiceToken_PushType.kPushTypeGtPUsh:
      return "kPushTypeGtPUsh";
    case PushServiceToken_PushType.kPushTypeOpPush:
      return "kPushTypeOpPush";
    case PushServiceToken_PushType.kPushTYpeVvPush:
      return "kPushTYpeVvPush";
    case PushServiceToken_PushType.kPushTypeHwPush:
      return "kPushTypeHwPush";
    case PushServiceToken_PushType.kPushTYpeFcm:
      return "kPushTYpeFcm";
    default:
      return "UNKNOWN";
  }
}

export const PushServiceToken = {
  encode(message: PushServiceToken, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.pushType);
    writer.uint32(18).bytes(message.token);
    writer.uint32(24).bool(message.isPassThrough);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PushServiceToken {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePushServiceToken } as PushServiceToken;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pushType = reader.int32() as any;
          break;
        case 2:
          message.token = reader.bytes();
          break;
        case 3:
          message.isPassThrough = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PushServiceToken {
    const message = { ...basePushServiceToken } as PushServiceToken;
    if (object.pushType !== undefined && object.pushType !== null) {
      message.pushType = pushServiceToken_PushTypeFromJSON(object.pushType);
    } else {
      message.pushType = 0;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = bytesFromBase64(object.token);
    }
    if (object.isPassThrough !== undefined && object.isPassThrough !== null) {
      message.isPassThrough = Boolean(object.isPassThrough);
    } else {
      message.isPassThrough = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PushServiceToken>): PushServiceToken {
    const message = { ...basePushServiceToken } as PushServiceToken;
    if (object.pushType !== undefined && object.pushType !== null) {
      message.pushType = object.pushType;
    } else {
      message.pushType = 0;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = new Uint8Array();
    }
    if (object.isPassThrough !== undefined && object.isPassThrough !== null) {
      message.isPassThrough = object.isPassThrough;
    } else {
      message.isPassThrough = false;
    }
    return message;
  },
  toJSON(message: PushServiceToken): unknown {
    const obj: any = {};
    message.pushType !== undefined && (obj.pushType = pushServiceToken_PushTypeToJSON(message.pushType));
    message.token !== undefined && (obj.token = base64FromBytes(message.token !== undefined ? message.token : new Uint8Array()));
    message.isPassThrough !== undefined && (obj.isPassThrough = message.isPassThrough);
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
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