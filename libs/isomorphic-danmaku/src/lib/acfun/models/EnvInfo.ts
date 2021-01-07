/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface EnvInfo {
  networkType: EnvInfo_NetworkType;
  appName: Uint8Array;
}

const baseEnvInfo: object = {
  networkType: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum EnvInfo_NetworkType {
  kInvalid = 0,
  kWIFI = 1,
  kCellular = 2,
  UNRECOGNIZED = -1,
}

export function envInfo_NetworkTypeFromJSON(object: any): EnvInfo_NetworkType {
  switch (object) {
    case 0:
    case "kInvalid":
      return EnvInfo_NetworkType.kInvalid;
    case 1:
    case "kWIFI":
      return EnvInfo_NetworkType.kWIFI;
    case 2:
    case "kCellular":
      return EnvInfo_NetworkType.kCellular;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EnvInfo_NetworkType.UNRECOGNIZED;
  }
}

export function envInfo_NetworkTypeToJSON(object: EnvInfo_NetworkType): string {
  switch (object) {
    case EnvInfo_NetworkType.kInvalid:
      return "kInvalid";
    case EnvInfo_NetworkType.kWIFI:
      return "kWIFI";
    case EnvInfo_NetworkType.kCellular:
      return "kCellular";
    default:
      return "UNKNOWN";
  }
}

export const EnvInfo = {
  encode(message: EnvInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.networkType);
    writer.uint32(18).bytes(message.appName);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): EnvInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnvInfo } as EnvInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.networkType = reader.int32() as any;
          break;
        case 2:
          message.appName = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): EnvInfo {
    const message = { ...baseEnvInfo } as EnvInfo;
    if (object.networkType !== undefined && object.networkType !== null) {
      message.networkType = envInfo_NetworkTypeFromJSON(object.networkType);
    } else {
      message.networkType = 0;
    }
    if (object.appName !== undefined && object.appName !== null) {
      message.appName = bytesFromBase64(object.appName);
    }
    return message;
  },
  fromPartial(object: DeepPartial<EnvInfo>): EnvInfo {
    const message = { ...baseEnvInfo } as EnvInfo;
    if (object.networkType !== undefined && object.networkType !== null) {
      message.networkType = object.networkType;
    } else {
      message.networkType = 0;
    }
    if (object.appName !== undefined && object.appName !== null) {
      message.appName = object.appName;
    } else {
      message.appName = new Uint8Array();
    }
    return message;
  },
  toJSON(message: EnvInfo): unknown {
    const obj: any = {};
    message.networkType !== undefined && (obj.networkType = envInfo_NetworkTypeToJSON(message.networkType));
    message.appName !== undefined && (obj.appName = base64FromBytes(message.appName !== undefined ? message.appName : new Uint8Array()));
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