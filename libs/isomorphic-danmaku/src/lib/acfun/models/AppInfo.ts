/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface AppInfo {
  appName: string;
  appVersion: string;
  appChannel: string;
  sdkVersion: string;
  extensionInfo: { [key: string]: string };
}

export interface AppInfo_ExtensionInfoEntry {
  key: string;
  value: string;
}

const baseAppInfo: object = {
  appName: "",
  appVersion: "",
  appChannel: "",
  sdkVersion: "",
};

const baseAppInfo_ExtensionInfoEntry: object = {
  key: "",
  value: "",
};

export const protobufPackage = 'AcFunDanmu'

export const AppInfo = {
  encode(message: AppInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.appName);
    writer.uint32(18).string(message.appVersion);
    writer.uint32(26).string(message.appChannel);
    writer.uint32(34).string(message.sdkVersion);
    Object.entries(message.extensionInfo).forEach(([key, value]) => {
      AppInfo_ExtensionInfoEntry.encode({ key: key as any, value }, writer.uint32(90).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AppInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAppInfo } as AppInfo;
    message.extensionInfo = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appName = reader.string();
          break;
        case 2:
          message.appVersion = reader.string();
          break;
        case 3:
          message.appChannel = reader.string();
          break;
        case 4:
          message.sdkVersion = reader.string();
          break;
        case 11:
          const entry11 = AppInfo_ExtensionInfoEntry.decode(reader, reader.uint32());
          if (entry11.value !== undefined) {
            message.extensionInfo[entry11.key] = entry11.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AppInfo {
    const message = { ...baseAppInfo } as AppInfo;
    message.extensionInfo = {};
    if (object.appName !== undefined && object.appName !== null) {
      message.appName = String(object.appName);
    } else {
      message.appName = "";
    }
    if (object.appVersion !== undefined && object.appVersion !== null) {
      message.appVersion = String(object.appVersion);
    } else {
      message.appVersion = "";
    }
    if (object.appChannel !== undefined && object.appChannel !== null) {
      message.appChannel = String(object.appChannel);
    } else {
      message.appChannel = "";
    }
    if (object.sdkVersion !== undefined && object.sdkVersion !== null) {
      message.sdkVersion = String(object.sdkVersion);
    } else {
      message.sdkVersion = "";
    }
    if (object.extensionInfo !== undefined && object.extensionInfo !== null) {
      Object.entries(object.extensionInfo).forEach(([key, value]) => {
        message.extensionInfo[key] = String(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<AppInfo>): AppInfo {
    const message = { ...baseAppInfo } as AppInfo;
    message.extensionInfo = {};
    if (object.appName !== undefined && object.appName !== null) {
      message.appName = object.appName;
    } else {
      message.appName = "";
    }
    if (object.appVersion !== undefined && object.appVersion !== null) {
      message.appVersion = object.appVersion;
    } else {
      message.appVersion = "";
    }
    if (object.appChannel !== undefined && object.appChannel !== null) {
      message.appChannel = object.appChannel;
    } else {
      message.appChannel = "";
    }
    if (object.sdkVersion !== undefined && object.sdkVersion !== null) {
      message.sdkVersion = object.sdkVersion;
    } else {
      message.sdkVersion = "";
    }
    if (object.extensionInfo !== undefined && object.extensionInfo !== null) {
      Object.entries(object.extensionInfo).forEach(([key, value]) => {
        if (value !== undefined) {
          message.extensionInfo[key] = String(value);
        }
      })
    }
    return message;
  },
  toJSON(message: AppInfo): unknown {
    const obj: any = {};
    message.appName !== undefined && (obj.appName = message.appName);
    message.appVersion !== undefined && (obj.appVersion = message.appVersion);
    message.appChannel !== undefined && (obj.appChannel = message.appChannel);
    message.sdkVersion !== undefined && (obj.sdkVersion = message.sdkVersion);
    obj.extensionInfo = {};
    if (message.extensionInfo) {
      Object.entries(message.extensionInfo).forEach(([k, v]) => {
        obj.extensionInfo[k] = v;
      })
    }
    return obj;
  },
};

export const AppInfo_ExtensionInfoEntry = {
  encode(message: AppInfo_ExtensionInfoEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AppInfo_ExtensionInfoEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAppInfo_ExtensionInfoEntry } as AppInfo_ExtensionInfoEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AppInfo_ExtensionInfoEntry {
    const message = { ...baseAppInfo_ExtensionInfoEntry } as AppInfo_ExtensionInfoEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<AppInfo_ExtensionInfoEntry>): AppInfo_ExtensionInfoEntry {
    const message = { ...baseAppInfo_ExtensionInfoEntry } as AppInfo_ExtensionInfoEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message: AppInfo_ExtensionInfoEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
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