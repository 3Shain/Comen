/* eslint-disable */
import { DeviceInfo_PlatformType, DeviceInfo, deviceInfo_PlatformTypeFromJSON, deviceInfo_PlatformTypeToJSON } from './DeviceInfo';
import { AppInfo } from './AppInfo';
import { EnvInfo } from './EnvInfo';
import { Writer, Reader } from 'protobufjs/minimal';


/**
 * RequsetBasicInfo
 */
export interface RequestBasicInfo {
  clientType: DeviceInfo_PlatformType;
  deviceId: string;
  clientIp: string;
  appVersion: string;
  channel: string;
  appInfo: AppInfo | undefined;
  deviceInfo: DeviceInfo | undefined;
  envInfo: EnvInfo | undefined;
  clientPort: number;
  location: string;
  kpf: string;
}

const baseRequestBasicInfo: object = {
  clientType: 0,
  deviceId: "",
  clientIp: "",
  appVersion: "",
  channel: "",
  clientPort: 0,
  location: "",
  kpf: "",
};

export const protobufPackage = 'AcFunDanmu'

export const RequestBasicInfo = {
  encode(message: RequestBasicInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.clientType);
    writer.uint32(18).string(message.deviceId);
    writer.uint32(26).string(message.clientIp);
    writer.uint32(34).string(message.appVersion);
    writer.uint32(42).string(message.channel);
    if (message.appInfo !== undefined && message.appInfo !== undefined) {
      AppInfo.encode(message.appInfo, writer.uint32(50).fork()).ldelim();
    }
    if (message.deviceInfo !== undefined && message.deviceInfo !== undefined) {
      DeviceInfo.encode(message.deviceInfo, writer.uint32(58).fork()).ldelim();
    }
    if (message.envInfo !== undefined && message.envInfo !== undefined) {
      EnvInfo.encode(message.envInfo, writer.uint32(66).fork()).ldelim();
    }
    writer.uint32(72).int32(message.clientPort);
    writer.uint32(82).string(message.location);
    writer.uint32(90).string(message.kpf);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): RequestBasicInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestBasicInfo } as RequestBasicInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientType = reader.int32() as any;
          break;
        case 2:
          message.deviceId = reader.string();
          break;
        case 3:
          message.clientIp = reader.string();
          break;
        case 4:
          message.appVersion = reader.string();
          break;
        case 5:
          message.channel = reader.string();
          break;
        case 6:
          message.appInfo = AppInfo.decode(reader, reader.uint32());
          break;
        case 7:
          message.deviceInfo = DeviceInfo.decode(reader, reader.uint32());
          break;
        case 8:
          message.envInfo = EnvInfo.decode(reader, reader.uint32());
          break;
        case 9:
          message.clientPort = reader.int32();
          break;
        case 10:
          message.location = reader.string();
          break;
        case 11:
          message.kpf = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RequestBasicInfo {
    const message = { ...baseRequestBasicInfo } as RequestBasicInfo;
    if (object.clientType !== undefined && object.clientType !== null) {
      message.clientType = deviceInfo_PlatformTypeFromJSON(object.clientType);
    } else {
      message.clientType = 0;
    }
    if (object.deviceId !== undefined && object.deviceId !== null) {
      message.deviceId = String(object.deviceId);
    } else {
      message.deviceId = "";
    }
    if (object.clientIp !== undefined && object.clientIp !== null) {
      message.clientIp = String(object.clientIp);
    } else {
      message.clientIp = "";
    }
    if (object.appVersion !== undefined && object.appVersion !== null) {
      message.appVersion = String(object.appVersion);
    } else {
      message.appVersion = "";
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = String(object.channel);
    } else {
      message.channel = "";
    }
    if (object.appInfo !== undefined && object.appInfo !== null) {
      message.appInfo = AppInfo.fromJSON(object.appInfo);
    } else {
      message.appInfo = undefined;
    }
    if (object.deviceInfo !== undefined && object.deviceInfo !== null) {
      message.deviceInfo = DeviceInfo.fromJSON(object.deviceInfo);
    } else {
      message.deviceInfo = undefined;
    }
    if (object.envInfo !== undefined && object.envInfo !== null) {
      message.envInfo = EnvInfo.fromJSON(object.envInfo);
    } else {
      message.envInfo = undefined;
    }
    if (object.clientPort !== undefined && object.clientPort !== null) {
      message.clientPort = Number(object.clientPort);
    } else {
      message.clientPort = 0;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = String(object.location);
    } else {
      message.location = "";
    }
    if (object.kpf !== undefined && object.kpf !== null) {
      message.kpf = String(object.kpf);
    } else {
      message.kpf = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<RequestBasicInfo>): RequestBasicInfo {
    const message = { ...baseRequestBasicInfo } as RequestBasicInfo;
    if (object.clientType !== undefined && object.clientType !== null) {
      message.clientType = object.clientType;
    } else {
      message.clientType = 0;
    }
    if (object.deviceId !== undefined && object.deviceId !== null) {
      message.deviceId = object.deviceId;
    } else {
      message.deviceId = "";
    }
    if (object.clientIp !== undefined && object.clientIp !== null) {
      message.clientIp = object.clientIp;
    } else {
      message.clientIp = "";
    }
    if (object.appVersion !== undefined && object.appVersion !== null) {
      message.appVersion = object.appVersion;
    } else {
      message.appVersion = "";
    }
    if (object.channel !== undefined && object.channel !== null) {
      message.channel = object.channel;
    } else {
      message.channel = "";
    }
    if (object.appInfo !== undefined && object.appInfo !== null) {
      message.appInfo = AppInfo.fromPartial(object.appInfo);
    } else {
      message.appInfo = undefined;
    }
    if (object.deviceInfo !== undefined && object.deviceInfo !== null) {
      message.deviceInfo = DeviceInfo.fromPartial(object.deviceInfo);
    } else {
      message.deviceInfo = undefined;
    }
    if (object.envInfo !== undefined && object.envInfo !== null) {
      message.envInfo = EnvInfo.fromPartial(object.envInfo);
    } else {
      message.envInfo = undefined;
    }
    if (object.clientPort !== undefined && object.clientPort !== null) {
      message.clientPort = object.clientPort;
    } else {
      message.clientPort = 0;
    }
    if (object.location !== undefined && object.location !== null) {
      message.location = object.location;
    } else {
      message.location = "";
    }
    if (object.kpf !== undefined && object.kpf !== null) {
      message.kpf = object.kpf;
    } else {
      message.kpf = "";
    }
    return message;
  },
  toJSON(message: RequestBasicInfo): unknown {
    const obj: any = {};
    message.clientType !== undefined && (obj.clientType = deviceInfo_PlatformTypeToJSON(message.clientType));
    message.deviceId !== undefined && (obj.deviceId = message.deviceId);
    message.clientIp !== undefined && (obj.clientIp = message.clientIp);
    message.appVersion !== undefined && (obj.appVersion = message.appVersion);
    message.channel !== undefined && (obj.channel = message.channel);
    message.appInfo !== undefined && (obj.appInfo = message.appInfo ? AppInfo.toJSON(message.appInfo) : undefined);
    message.deviceInfo !== undefined && (obj.deviceInfo = message.deviceInfo ? DeviceInfo.toJSON(message.deviceInfo) : undefined);
    message.envInfo !== undefined && (obj.envInfo = message.envInfo ? EnvInfo.toJSON(message.envInfo) : undefined);
    message.clientPort !== undefined && (obj.clientPort = message.clientPort);
    message.location !== undefined && (obj.location = message.location);
    message.kpf !== undefined && (obj.kpf = message.kpf);
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