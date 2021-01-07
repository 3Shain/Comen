/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface DeviceInfo {
  platformType: DeviceInfo_PlatformType;
  osVersion: string;
  deviceModel: string;
  imeiMd5: Uint8Array;
  deviceId: string;
  softDid: string;
  kwaiDid: string;
  manufacturer: string;
  deviceName: string;
}

const baseDeviceInfo: object = {
  platformType: 0,
  osVersion: "",
  deviceModel: "",
  deviceId: "",
  softDid: "",
  kwaiDid: "",
  manufacturer: "",
  deviceName: "",
};

export const protobufPackage = 'AcFunDanmu'

export enum DeviceInfo_PlatformType {
  kInvalid = 0,
  kAndroid = 1,
  kiOS = 2,
  kWindows = 3,
  WECHAT_ANDROID = 4,
  WECHAT_IOS = 5,
  H5 = 6,
  H5_ANDROID = 7,
  H5_IOS = 8,
  H5_WINDOWS = 9,
  H5_MAC = 10,
  kPlatformNum = 11,
  UNRECOGNIZED = -1,
}

export function deviceInfo_PlatformTypeFromJSON(object: any): DeviceInfo_PlatformType {
  switch (object) {
    case 0:
    case "kInvalid":
      return DeviceInfo_PlatformType.kInvalid;
    case 1:
    case "kAndroid":
      return DeviceInfo_PlatformType.kAndroid;
    case 2:
    case "kiOS":
      return DeviceInfo_PlatformType.kiOS;
    case 3:
    case "kWindows":
      return DeviceInfo_PlatformType.kWindows;
    case 4:
    case "WECHAT_ANDROID":
      return DeviceInfo_PlatformType.WECHAT_ANDROID;
    case 5:
    case "WECHAT_IOS":
      return DeviceInfo_PlatformType.WECHAT_IOS;
    case 6:
    case "H5":
      return DeviceInfo_PlatformType.H5;
    case 7:
    case "H5_ANDROID":
      return DeviceInfo_PlatformType.H5_ANDROID;
    case 8:
    case "H5_IOS":
      return DeviceInfo_PlatformType.H5_IOS;
    case 9:
    case "H5_WINDOWS":
      return DeviceInfo_PlatformType.H5_WINDOWS;
    case 10:
    case "H5_MAC":
      return DeviceInfo_PlatformType.H5_MAC;
    case 11:
    case "kPlatformNum":
      return DeviceInfo_PlatformType.kPlatformNum;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DeviceInfo_PlatformType.UNRECOGNIZED;
  }
}

export function deviceInfo_PlatformTypeToJSON(object: DeviceInfo_PlatformType): string {
  switch (object) {
    case DeviceInfo_PlatformType.kInvalid:
      return "kInvalid";
    case DeviceInfo_PlatformType.kAndroid:
      return "kAndroid";
    case DeviceInfo_PlatformType.kiOS:
      return "kiOS";
    case DeviceInfo_PlatformType.kWindows:
      return "kWindows";
    case DeviceInfo_PlatformType.WECHAT_ANDROID:
      return "WECHAT_ANDROID";
    case DeviceInfo_PlatformType.WECHAT_IOS:
      return "WECHAT_IOS";
    case DeviceInfo_PlatformType.H5:
      return "H5";
    case DeviceInfo_PlatformType.H5_ANDROID:
      return "H5_ANDROID";
    case DeviceInfo_PlatformType.H5_IOS:
      return "H5_IOS";
    case DeviceInfo_PlatformType.H5_WINDOWS:
      return "H5_WINDOWS";
    case DeviceInfo_PlatformType.H5_MAC:
      return "H5_MAC";
    case DeviceInfo_PlatformType.kPlatformNum:
      return "kPlatformNum";
    default:
      return "UNKNOWN";
  }
}

export const DeviceInfo = {
  encode(message: DeviceInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.platformType);
    writer.uint32(18).string(message.osVersion);
    writer.uint32(26).string(message.deviceModel);
    writer.uint32(34).bytes(message.imeiMd5);
    writer.uint32(42).string(message.deviceId);
    writer.uint32(50).string(message.softDid);
    writer.uint32(58).string(message.kwaiDid);
    writer.uint32(66).string(message.manufacturer);
    writer.uint32(74).string(message.deviceName);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceInfo } as DeviceInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.platformType = reader.int32() as any;
          break;
        case 2:
          message.osVersion = reader.string();
          break;
        case 3:
          message.deviceModel = reader.string();
          break;
        case 4:
          message.imeiMd5 = reader.bytes();
          break;
        case 5:
          message.deviceId = reader.string();
          break;
        case 6:
          message.softDid = reader.string();
          break;
        case 7:
          message.kwaiDid = reader.string();
          break;
        case 8:
          message.manufacturer = reader.string();
          break;
        case 9:
          message.deviceName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceInfo {
    const message = { ...baseDeviceInfo } as DeviceInfo;
    if (object.platformType !== undefined && object.platformType !== null) {
      message.platformType = deviceInfo_PlatformTypeFromJSON(object.platformType);
    } else {
      message.platformType = 0;
    }
    if (object.osVersion !== undefined && object.osVersion !== null) {
      message.osVersion = String(object.osVersion);
    } else {
      message.osVersion = "";
    }
    if (object.deviceModel !== undefined && object.deviceModel !== null) {
      message.deviceModel = String(object.deviceModel);
    } else {
      message.deviceModel = "";
    }
    if (object.imeiMd5 !== undefined && object.imeiMd5 !== null) {
      message.imeiMd5 = bytesFromBase64(object.imeiMd5);
    }
    if (object.deviceId !== undefined && object.deviceId !== null) {
      message.deviceId = String(object.deviceId);
    } else {
      message.deviceId = "";
    }
    if (object.softDid !== undefined && object.softDid !== null) {
      message.softDid = String(object.softDid);
    } else {
      message.softDid = "";
    }
    if (object.kwaiDid !== undefined && object.kwaiDid !== null) {
      message.kwaiDid = String(object.kwaiDid);
    } else {
      message.kwaiDid = "";
    }
    if (object.manufacturer !== undefined && object.manufacturer !== null) {
      message.manufacturer = String(object.manufacturer);
    } else {
      message.manufacturer = "";
    }
    if (object.deviceName !== undefined && object.deviceName !== null) {
      message.deviceName = String(object.deviceName);
    } else {
      message.deviceName = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceInfo>): DeviceInfo {
    const message = { ...baseDeviceInfo } as DeviceInfo;
    if (object.platformType !== undefined && object.platformType !== null) {
      message.platformType = object.platformType;
    } else {
      message.platformType = 0;
    }
    if (object.osVersion !== undefined && object.osVersion !== null) {
      message.osVersion = object.osVersion;
    } else {
      message.osVersion = "";
    }
    if (object.deviceModel !== undefined && object.deviceModel !== null) {
      message.deviceModel = object.deviceModel;
    } else {
      message.deviceModel = "";
    }
    if (object.imeiMd5 !== undefined && object.imeiMd5 !== null) {
      message.imeiMd5 = object.imeiMd5;
    } else {
      message.imeiMd5 = new Uint8Array();
    }
    if (object.deviceId !== undefined && object.deviceId !== null) {
      message.deviceId = object.deviceId;
    } else {
      message.deviceId = "";
    }
    if (object.softDid !== undefined && object.softDid !== null) {
      message.softDid = object.softDid;
    } else {
      message.softDid = "";
    }
    if (object.kwaiDid !== undefined && object.kwaiDid !== null) {
      message.kwaiDid = object.kwaiDid;
    } else {
      message.kwaiDid = "";
    }
    if (object.manufacturer !== undefined && object.manufacturer !== null) {
      message.manufacturer = object.manufacturer;
    } else {
      message.manufacturer = "";
    }
    if (object.deviceName !== undefined && object.deviceName !== null) {
      message.deviceName = object.deviceName;
    } else {
      message.deviceName = "";
    }
    return message;
  },
  toJSON(message: DeviceInfo): unknown {
    const obj: any = {};
    message.platformType !== undefined && (obj.platformType = deviceInfo_PlatformTypeToJSON(message.platformType));
    message.osVersion !== undefined && (obj.osVersion = message.osVersion);
    message.deviceModel !== undefined && (obj.deviceModel = message.deviceModel);
    message.imeiMd5 !== undefined && (obj.imeiMd5 = base64FromBytes(message.imeiMd5 !== undefined ? message.imeiMd5 : new Uint8Array()));
    message.deviceId !== undefined && (obj.deviceId = message.deviceId);
    message.softDid !== undefined && (obj.softDid = message.softDid);
    message.kwaiDid !== undefined && (obj.kwaiDid = message.kwaiDid);
    message.manufacturer !== undefined && (obj.manufacturer = message.manufacturer);
    message.deviceName !== undefined && (obj.deviceName = message.deviceName);
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