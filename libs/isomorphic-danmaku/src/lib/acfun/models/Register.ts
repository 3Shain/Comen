/* eslint-disable */
import { AppInfo } from './AppInfo';
import { DeviceInfo } from './DeviceInfo';
import { EnvInfo } from './EnvInfo';
import { PushServiceToken } from './PushServiceToken';
import * as Long from 'long';
import { ZtCommonInfo } from './ZtCommonInfo';
import { AccessPointsConfig } from './AccessPointsConfig';
import { SdkOption } from './SdkOption';
import { Writer, Reader } from 'protobufjs/minimal';


export interface RegisterRequest {
  appInfo: AppInfo | undefined;
  deviceInfo: DeviceInfo | undefined;
  envInfo: EnvInfo | undefined;
  presenceStatus: RegisterRequest_PresenceStatus;
  appActiveStatus: RegisterRequest_ActiveStatus;
  appCustomStatus: Uint8Array;
  pushServiceToken: PushServiceToken | undefined;
  instanceId: Long;
  pushServiceTokenList: PushServiceToken[];
  keepaliveIntervalSec: number;
  ztCommonInfo: ZtCommonInfo | undefined;
}

export interface RegisterResponse {
  accessPointsConfig: AccessPointsConfig | undefined;
  sessKey: Uint8Array;
  instanceId: Long;
  sdkOption: SdkOption | undefined;
  accessPointsCOnfigIpv6: AccessPointsConfig | undefined;
}

const baseRegisterRequest: object = {
  presenceStatus: 0,
  appActiveStatus: 0,
  instanceId: Long.ZERO,
  keepaliveIntervalSec: 0,
};

const baseRegisterResponse: object = {
  instanceId: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export enum RegisterRequest_PresenceStatus {
  kPresenceOffline = 0,
  kPresenceOnline = 1,
  UNRECOGNIZED = -1,
}

export function registerRequest_PresenceStatusFromJSON(object: any): RegisterRequest_PresenceStatus {
  switch (object) {
    case 0:
    case "kPresenceOffline":
      return RegisterRequest_PresenceStatus.kPresenceOffline;
    case 1:
    case "kPresenceOnline":
      return RegisterRequest_PresenceStatus.kPresenceOnline;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegisterRequest_PresenceStatus.UNRECOGNIZED;
  }
}

export function registerRequest_PresenceStatusToJSON(object: RegisterRequest_PresenceStatus): string {
  switch (object) {
    case RegisterRequest_PresenceStatus.kPresenceOffline:
      return "kPresenceOffline";
    case RegisterRequest_PresenceStatus.kPresenceOnline:
      return "kPresenceOnline";
    default:
      return "UNKNOWN";
  }
}

export enum RegisterRequest_ActiveStatus {
  kInvalid = 0,
  kAppInForeground = 1,
  kAppInBackground = 2,
  UNRECOGNIZED = -1,
}

export function registerRequest_ActiveStatusFromJSON(object: any): RegisterRequest_ActiveStatus {
  switch (object) {
    case 0:
    case "kInvalid":
      return RegisterRequest_ActiveStatus.kInvalid;
    case 1:
    case "kAppInForeground":
      return RegisterRequest_ActiveStatus.kAppInForeground;
    case 2:
    case "kAppInBackground":
      return RegisterRequest_ActiveStatus.kAppInBackground;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RegisterRequest_ActiveStatus.UNRECOGNIZED;
  }
}

export function registerRequest_ActiveStatusToJSON(object: RegisterRequest_ActiveStatus): string {
  switch (object) {
    case RegisterRequest_ActiveStatus.kInvalid:
      return "kInvalid";
    case RegisterRequest_ActiveStatus.kAppInForeground:
      return "kAppInForeground";
    case RegisterRequest_ActiveStatus.kAppInBackground:
      return "kAppInBackground";
    default:
      return "UNKNOWN";
  }
}

export const RegisterRequest = {
  encode(message: RegisterRequest, writer: Writer = Writer.create()): Writer {
    if (message.appInfo !== undefined && message.appInfo !== undefined) {
      AppInfo.encode(message.appInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.deviceInfo !== undefined && message.deviceInfo !== undefined) {
      DeviceInfo.encode(message.deviceInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.envInfo !== undefined && message.envInfo !== undefined) {
      EnvInfo.encode(message.envInfo, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(32).int32(message.presenceStatus);
    writer.uint32(40).int32(message.appActiveStatus);
    writer.uint32(50).bytes(message.appCustomStatus);
    if (message.pushServiceToken !== undefined && message.pushServiceToken !== undefined) {
      PushServiceToken.encode(message.pushServiceToken, writer.uint32(58).fork()).ldelim();
    }
    writer.uint32(64).int64(message.instanceId);
    for (const v of message.pushServiceTokenList) {
      PushServiceToken.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    writer.uint32(80).int32(message.keepaliveIntervalSec);
    if (message.ztCommonInfo !== undefined && message.ztCommonInfo !== undefined) {
      ZtCommonInfo.encode(message.ztCommonInfo, writer.uint32(90).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): RegisterRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegisterRequest } as RegisterRequest;
    message.pushServiceTokenList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appInfo = AppInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.deviceInfo = DeviceInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.envInfo = EnvInfo.decode(reader, reader.uint32());
          break;
        case 4:
          message.presenceStatus = reader.int32() as any;
          break;
        case 5:
          message.appActiveStatus = reader.int32() as any;
          break;
        case 6:
          message.appCustomStatus = reader.bytes();
          break;
        case 7:
          message.pushServiceToken = PushServiceToken.decode(reader, reader.uint32());
          break;
        case 8:
          message.instanceId = reader.int64() as Long;
          break;
        case 9:
          message.pushServiceTokenList.push(PushServiceToken.decode(reader, reader.uint32()));
          break;
        case 10:
          message.keepaliveIntervalSec = reader.int32();
          break;
        case 11:
          message.ztCommonInfo = ZtCommonInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RegisterRequest {
    const message = { ...baseRegisterRequest } as RegisterRequest;
    message.pushServiceTokenList = [];
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
    if (object.presenceStatus !== undefined && object.presenceStatus !== null) {
      message.presenceStatus = registerRequest_PresenceStatusFromJSON(object.presenceStatus);
    } else {
      message.presenceStatus = 0;
    }
    if (object.appActiveStatus !== undefined && object.appActiveStatus !== null) {
      message.appActiveStatus = registerRequest_ActiveStatusFromJSON(object.appActiveStatus);
    } else {
      message.appActiveStatus = 0;
    }
    if (object.appCustomStatus !== undefined && object.appCustomStatus !== null) {
      message.appCustomStatus = bytesFromBase64(object.appCustomStatus);
    }
    if (object.pushServiceToken !== undefined && object.pushServiceToken !== null) {
      message.pushServiceToken = PushServiceToken.fromJSON(object.pushServiceToken);
    } else {
      message.pushServiceToken = undefined;
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = Long.fromString(object.instanceId);
    } else {
      message.instanceId = Long.ZERO;
    }
    if (object.pushServiceTokenList !== undefined && object.pushServiceTokenList !== null) {
      for (const e of object.pushServiceTokenList) {
        message.pushServiceTokenList.push(PushServiceToken.fromJSON(e));
      }
    }
    if (object.keepaliveIntervalSec !== undefined && object.keepaliveIntervalSec !== null) {
      message.keepaliveIntervalSec = Number(object.keepaliveIntervalSec);
    } else {
      message.keepaliveIntervalSec = 0;
    }
    if (object.ztCommonInfo !== undefined && object.ztCommonInfo !== null) {
      message.ztCommonInfo = ZtCommonInfo.fromJSON(object.ztCommonInfo);
    } else {
      message.ztCommonInfo = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<RegisterRequest>): RegisterRequest {
    const message = { ...baseRegisterRequest } as RegisterRequest;
    message.pushServiceTokenList = [];
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
    if (object.presenceStatus !== undefined && object.presenceStatus !== null) {
      message.presenceStatus = object.presenceStatus;
    } else {
      message.presenceStatus = 0;
    }
    if (object.appActiveStatus !== undefined && object.appActiveStatus !== null) {
      message.appActiveStatus = object.appActiveStatus;
    } else {
      message.appActiveStatus = 0;
    }
    if (object.appCustomStatus !== undefined && object.appCustomStatus !== null) {
      message.appCustomStatus = object.appCustomStatus;
    } else {
      message.appCustomStatus = new Uint8Array();
    }
    if (object.pushServiceToken !== undefined && object.pushServiceToken !== null) {
      message.pushServiceToken = PushServiceToken.fromPartial(object.pushServiceToken);
    } else {
      message.pushServiceToken = undefined;
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = object.instanceId as Long;
    } else {
      message.instanceId = Long.ZERO;
    }
    if (object.pushServiceTokenList !== undefined && object.pushServiceTokenList !== null) {
      for (const e of object.pushServiceTokenList) {
        message.pushServiceTokenList.push(PushServiceToken.fromPartial(e));
      }
    }
    if (object.keepaliveIntervalSec !== undefined && object.keepaliveIntervalSec !== null) {
      message.keepaliveIntervalSec = object.keepaliveIntervalSec;
    } else {
      message.keepaliveIntervalSec = 0;
    }
    if (object.ztCommonInfo !== undefined && object.ztCommonInfo !== null) {
      message.ztCommonInfo = ZtCommonInfo.fromPartial(object.ztCommonInfo);
    } else {
      message.ztCommonInfo = undefined;
    }
    return message;
  },
  toJSON(message: RegisterRequest): unknown {
    const obj: any = {};
    message.appInfo !== undefined && (obj.appInfo = message.appInfo ? AppInfo.toJSON(message.appInfo) : undefined);
    message.deviceInfo !== undefined && (obj.deviceInfo = message.deviceInfo ? DeviceInfo.toJSON(message.deviceInfo) : undefined);
    message.envInfo !== undefined && (obj.envInfo = message.envInfo ? EnvInfo.toJSON(message.envInfo) : undefined);
    message.presenceStatus !== undefined && (obj.presenceStatus = registerRequest_PresenceStatusToJSON(message.presenceStatus));
    message.appActiveStatus !== undefined && (obj.appActiveStatus = registerRequest_ActiveStatusToJSON(message.appActiveStatus));
    message.appCustomStatus !== undefined && (obj.appCustomStatus = base64FromBytes(message.appCustomStatus !== undefined ? message.appCustomStatus : new Uint8Array()));
    message.pushServiceToken !== undefined && (obj.pushServiceToken = message.pushServiceToken ? PushServiceToken.toJSON(message.pushServiceToken) : undefined);
    message.instanceId !== undefined && (obj.instanceId = (message.instanceId || Long.ZERO).toString());
    if (message.pushServiceTokenList) {
      obj.pushServiceTokenList = message.pushServiceTokenList.map(e => e ? PushServiceToken.toJSON(e) : undefined);
    } else {
      obj.pushServiceTokenList = [];
    }
    message.keepaliveIntervalSec !== undefined && (obj.keepaliveIntervalSec = message.keepaliveIntervalSec);
    message.ztCommonInfo !== undefined && (obj.ztCommonInfo = message.ztCommonInfo ? ZtCommonInfo.toJSON(message.ztCommonInfo) : undefined);
    return obj;
  },
};

export const RegisterResponse = {
  encode(message: RegisterResponse, writer: Writer = Writer.create()): Writer {
    if (message.accessPointsConfig !== undefined && message.accessPointsConfig !== undefined) {
      AccessPointsConfig.encode(message.accessPointsConfig, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).bytes(message.sessKey);
    writer.uint32(24).int64(message.instanceId);
    if (message.sdkOption !== undefined && message.sdkOption !== undefined) {
      SdkOption.encode(message.sdkOption, writer.uint32(34).fork()).ldelim();
    }
    if (message.accessPointsCOnfigIpv6 !== undefined && message.accessPointsCOnfigIpv6 !== undefined) {
      AccessPointsConfig.encode(message.accessPointsCOnfigIpv6, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): RegisterResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRegisterResponse } as RegisterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessPointsConfig = AccessPointsConfig.decode(reader, reader.uint32());
          break;
        case 2:
          message.sessKey = reader.bytes();
          break;
        case 3:
          message.instanceId = reader.int64() as Long;
          break;
        case 4:
          message.sdkOption = SdkOption.decode(reader, reader.uint32());
          break;
        case 5:
          message.accessPointsCOnfigIpv6 = AccessPointsConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): RegisterResponse {
    const message = { ...baseRegisterResponse } as RegisterResponse;
    if (object.accessPointsConfig !== undefined && object.accessPointsConfig !== null) {
      message.accessPointsConfig = AccessPointsConfig.fromJSON(object.accessPointsConfig);
    } else {
      message.accessPointsConfig = undefined;
    }
    if (object.sessKey !== undefined && object.sessKey !== null) {
      message.sessKey = bytesFromBase64(object.sessKey);
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = Long.fromString(object.instanceId);
    } else {
      message.instanceId = Long.ZERO;
    }
    if (object.sdkOption !== undefined && object.sdkOption !== null) {
      message.sdkOption = SdkOption.fromJSON(object.sdkOption);
    } else {
      message.sdkOption = undefined;
    }
    if (object.accessPointsCOnfigIpv6 !== undefined && object.accessPointsCOnfigIpv6 !== null) {
      message.accessPointsCOnfigIpv6 = AccessPointsConfig.fromJSON(object.accessPointsCOnfigIpv6);
    } else {
      message.accessPointsCOnfigIpv6 = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<RegisterResponse>): RegisterResponse {
    const message = { ...baseRegisterResponse } as RegisterResponse;
    if (object.accessPointsConfig !== undefined && object.accessPointsConfig !== null) {
      message.accessPointsConfig = AccessPointsConfig.fromPartial(object.accessPointsConfig);
    } else {
      message.accessPointsConfig = undefined;
    }
    if (object.sessKey !== undefined && object.sessKey !== null) {
      message.sessKey = object.sessKey;
    } else {
      message.sessKey = new Uint8Array();
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = object.instanceId as Long;
    } else {
      message.instanceId = Long.ZERO;
    }
    if (object.sdkOption !== undefined && object.sdkOption !== null) {
      message.sdkOption = SdkOption.fromPartial(object.sdkOption);
    } else {
      message.sdkOption = undefined;
    }
    if (object.accessPointsCOnfigIpv6 !== undefined && object.accessPointsCOnfigIpv6 !== null) {
      message.accessPointsCOnfigIpv6 = AccessPointsConfig.fromPartial(object.accessPointsCOnfigIpv6);
    } else {
      message.accessPointsCOnfigIpv6 = undefined;
    }
    return message;
  },
  toJSON(message: RegisterResponse): unknown {
    const obj: any = {};
    message.accessPointsConfig !== undefined && (obj.accessPointsConfig = message.accessPointsConfig ? AccessPointsConfig.toJSON(message.accessPointsConfig) : undefined);
    message.sessKey !== undefined && (obj.sessKey = base64FromBytes(message.sessKey !== undefined ? message.sessKey : new Uint8Array()));
    message.instanceId !== undefined && (obj.instanceId = (message.instanceId || Long.ZERO).toString());
    message.sdkOption !== undefined && (obj.sdkOption = message.sdkOption ? SdkOption.toJSON(message.sdkOption) : undefined);
    message.accessPointsCOnfigIpv6 !== undefined && (obj.accessPointsCOnfigIpv6 = message.accessPointsCOnfigIpv6 ? AccessPointsConfig.toJSON(message.accessPointsCOnfigIpv6) : undefined);
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