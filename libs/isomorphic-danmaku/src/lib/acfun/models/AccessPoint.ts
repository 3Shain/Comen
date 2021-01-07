/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface AccessPoint {
  addressType: AccessPoint_AddressType;
  port: number;
  ipV4: number;
  ipV6: Uint8Array;
  domain: string;
}

const baseAccessPoint: object = {
  addressType: 0,
  port: 0,
  ipV4: 0,
  domain: "",
};

export const protobufPackage = 'AcFunDanmu'

export enum AccessPoint_AddressType {
  kIPV4 = 0,
  kIPV6 = 1,
  kDomain = 2,
  UNRECOGNIZED = -1,
}

export function accessPoint_AddressTypeFromJSON(object: any): AccessPoint_AddressType {
  switch (object) {
    case 0:
    case "kIPV4":
      return AccessPoint_AddressType.kIPV4;
    case 1:
    case "kIPV6":
      return AccessPoint_AddressType.kIPV6;
    case 2:
    case "kDomain":
      return AccessPoint_AddressType.kDomain;
    case -1:
    case "UNRECOGNIZED":
    default:
      return AccessPoint_AddressType.UNRECOGNIZED;
  }
}

export function accessPoint_AddressTypeToJSON(object: AccessPoint_AddressType): string {
  switch (object) {
    case AccessPoint_AddressType.kIPV4:
      return "kIPV4";
    case AccessPoint_AddressType.kIPV6:
      return "kIPV6";
    case AccessPoint_AddressType.kDomain:
      return "kDomain";
    default:
      return "UNKNOWN";
  }
}

export const AccessPoint = {
  encode(message: AccessPoint, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.addressType);
    writer.uint32(16).uint32(message.port);
    writer.uint32(29).fixed32(message.ipV4);
    writer.uint32(34).bytes(message.ipV6);
    writer.uint32(42).string(message.domain);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AccessPoint {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccessPoint } as AccessPoint;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressType = reader.int32() as any;
          break;
        case 2:
          message.port = reader.uint32();
          break;
        case 3:
          message.ipV4 = reader.fixed32();
          break;
        case 4:
          message.ipV6 = reader.bytes();
          break;
        case 5:
          message.domain = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AccessPoint {
    const message = { ...baseAccessPoint } as AccessPoint;
    if (object.addressType !== undefined && object.addressType !== null) {
      message.addressType = accessPoint_AddressTypeFromJSON(object.addressType);
    } else {
      message.addressType = 0;
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = Number(object.port);
    } else {
      message.port = 0;
    }
    if (object.ipV4 !== undefined && object.ipV4 !== null) {
      message.ipV4 = Number(object.ipV4);
    } else {
      message.ipV4 = 0;
    }
    if (object.ipV6 !== undefined && object.ipV6 !== null) {
      message.ipV6 = bytesFromBase64(object.ipV6);
    }
    if (object.domain !== undefined && object.domain !== null) {
      message.domain = String(object.domain);
    } else {
      message.domain = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<AccessPoint>): AccessPoint {
    const message = { ...baseAccessPoint } as AccessPoint;
    if (object.addressType !== undefined && object.addressType !== null) {
      message.addressType = object.addressType;
    } else {
      message.addressType = 0;
    }
    if (object.port !== undefined && object.port !== null) {
      message.port = object.port;
    } else {
      message.port = 0;
    }
    if (object.ipV4 !== undefined && object.ipV4 !== null) {
      message.ipV4 = object.ipV4;
    } else {
      message.ipV4 = 0;
    }
    if (object.ipV6 !== undefined && object.ipV6 !== null) {
      message.ipV6 = object.ipV6;
    } else {
      message.ipV6 = new Uint8Array();
    }
    if (object.domain !== undefined && object.domain !== null) {
      message.domain = object.domain;
    } else {
      message.domain = "";
    }
    return message;
  },
  toJSON(message: AccessPoint): unknown {
    const obj: any = {};
    message.addressType !== undefined && (obj.addressType = accessPoint_AddressTypeToJSON(message.addressType));
    message.port !== undefined && (obj.port = message.port);
    message.ipV4 !== undefined && (obj.ipV4 = message.ipV4);
    message.ipV6 !== undefined && (obj.ipV6 = base64FromBytes(message.ipV6 !== undefined ? message.ipV6 : new Uint8Array()));
    message.domain !== undefined && (obj.domain = message.domain);
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