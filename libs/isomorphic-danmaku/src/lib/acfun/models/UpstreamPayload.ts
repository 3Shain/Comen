/* eslint-disable */
import * as Long from 'long';
import { UserInstance } from './UserInstance';
import { SettingInfo } from './SettingInfo';
import { RequestBasicInfo } from './RequestBasicInfo';
import { FrontendInfo } from './FrontendInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface UpstreamPayload {
  command: string;
  seqId: Long;
  retryCount: number;
  payloadData: Uint8Array;
  userInstance: UserInstance | undefined;
  errorCode: number;
  settingInfo: SettingInfo | undefined;
  requestBasicInfo: RequestBasicInfo | undefined;
  subBiz: string;
  frontendInfo: FrontendInfo | undefined;
  kpn: string;
  anonymouseUser: boolean;
}

const baseUpstreamPayload: object = {
  command: "",
  seqId: Long.ZERO,
  retryCount: 0,
  errorCode: 0,
  subBiz: "",
  kpn: "",
  anonymouseUser: false,
};

export const protobufPackage = 'AcFunDanmu'

export const UpstreamPayload = {
  encode(message: UpstreamPayload, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.command);
    writer.uint32(16).int64(message.seqId);
    writer.uint32(24).uint32(message.retryCount);
    writer.uint32(34).bytes(message.payloadData);
    if (message.userInstance !== undefined && message.userInstance !== undefined) {
      UserInstance.encode(message.userInstance, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(48).int32(message.errorCode);
    if (message.settingInfo !== undefined && message.settingInfo !== undefined) {
      SettingInfo.encode(message.settingInfo, writer.uint32(58).fork()).ldelim();
    }
    if (message.requestBasicInfo !== undefined && message.requestBasicInfo !== undefined) {
      RequestBasicInfo.encode(message.requestBasicInfo, writer.uint32(66).fork()).ldelim();
    }
    writer.uint32(74).string(message.subBiz);
    if (message.frontendInfo !== undefined && message.frontendInfo !== undefined) {
      FrontendInfo.encode(message.frontendInfo, writer.uint32(82).fork()).ldelim();
    }
    writer.uint32(90).string(message.kpn);
    writer.uint32(96).bool(message.anonymouseUser);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UpstreamPayload {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpstreamPayload } as UpstreamPayload;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.command = reader.string();
          break;
        case 2:
          message.seqId = reader.int64() as Long;
          break;
        case 3:
          message.retryCount = reader.uint32();
          break;
        case 4:
          message.payloadData = reader.bytes();
          break;
        case 5:
          message.userInstance = UserInstance.decode(reader, reader.uint32());
          break;
        case 6:
          message.errorCode = reader.int32();
          break;
        case 7:
          message.settingInfo = SettingInfo.decode(reader, reader.uint32());
          break;
        case 8:
          message.requestBasicInfo = RequestBasicInfo.decode(reader, reader.uint32());
          break;
        case 9:
          message.subBiz = reader.string();
          break;
        case 10:
          message.frontendInfo = FrontendInfo.decode(reader, reader.uint32());
          break;
        case 11:
          message.kpn = reader.string();
          break;
        case 12:
          message.anonymouseUser = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): UpstreamPayload {
    const message = { ...baseUpstreamPayload } as UpstreamPayload;
    if (object.command !== undefined && object.command !== null) {
      message.command = String(object.command);
    } else {
      message.command = "";
    }
    if (object.seqId !== undefined && object.seqId !== null) {
      message.seqId = Long.fromString(object.seqId);
    } else {
      message.seqId = Long.ZERO;
    }
    if (object.retryCount !== undefined && object.retryCount !== null) {
      message.retryCount = Number(object.retryCount);
    } else {
      message.retryCount = 0;
    }
    if (object.payloadData !== undefined && object.payloadData !== null) {
      message.payloadData = bytesFromBase64(object.payloadData);
    }
    if (object.userInstance !== undefined && object.userInstance !== null) {
      message.userInstance = UserInstance.fromJSON(object.userInstance);
    } else {
      message.userInstance = undefined;
    }
    if (object.errorCode !== undefined && object.errorCode !== null) {
      message.errorCode = Number(object.errorCode);
    } else {
      message.errorCode = 0;
    }
    if (object.settingInfo !== undefined && object.settingInfo !== null) {
      message.settingInfo = SettingInfo.fromJSON(object.settingInfo);
    } else {
      message.settingInfo = undefined;
    }
    if (object.requestBasicInfo !== undefined && object.requestBasicInfo !== null) {
      message.requestBasicInfo = RequestBasicInfo.fromJSON(object.requestBasicInfo);
    } else {
      message.requestBasicInfo = undefined;
    }
    if (object.subBiz !== undefined && object.subBiz !== null) {
      message.subBiz = String(object.subBiz);
    } else {
      message.subBiz = "";
    }
    if (object.frontendInfo !== undefined && object.frontendInfo !== null) {
      message.frontendInfo = FrontendInfo.fromJSON(object.frontendInfo);
    } else {
      message.frontendInfo = undefined;
    }
    if (object.kpn !== undefined && object.kpn !== null) {
      message.kpn = String(object.kpn);
    } else {
      message.kpn = "";
    }
    if (object.anonymouseUser !== undefined && object.anonymouseUser !== null) {
      message.anonymouseUser = Boolean(object.anonymouseUser);
    } else {
      message.anonymouseUser = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<UpstreamPayload>): UpstreamPayload {
    const message = { ...baseUpstreamPayload } as UpstreamPayload;
    if (object.command !== undefined && object.command !== null) {
      message.command = object.command;
    } else {
      message.command = "";
    }
    if (object.seqId !== undefined && object.seqId !== null) {
      message.seqId = object.seqId as Long;
    } else {
      message.seqId = Long.ZERO;
    }
    if (object.retryCount !== undefined && object.retryCount !== null) {
      message.retryCount = object.retryCount;
    } else {
      message.retryCount = 0;
    }
    if (object.payloadData !== undefined && object.payloadData !== null) {
      message.payloadData = object.payloadData;
    } else {
      message.payloadData = new Uint8Array();
    }
    if (object.userInstance !== undefined && object.userInstance !== null) {
      message.userInstance = UserInstance.fromPartial(object.userInstance);
    } else {
      message.userInstance = undefined;
    }
    if (object.errorCode !== undefined && object.errorCode !== null) {
      message.errorCode = object.errorCode;
    } else {
      message.errorCode = 0;
    }
    if (object.settingInfo !== undefined && object.settingInfo !== null) {
      message.settingInfo = SettingInfo.fromPartial(object.settingInfo);
    } else {
      message.settingInfo = undefined;
    }
    if (object.requestBasicInfo !== undefined && object.requestBasicInfo !== null) {
      message.requestBasicInfo = RequestBasicInfo.fromPartial(object.requestBasicInfo);
    } else {
      message.requestBasicInfo = undefined;
    }
    if (object.subBiz !== undefined && object.subBiz !== null) {
      message.subBiz = object.subBiz;
    } else {
      message.subBiz = "";
    }
    if (object.frontendInfo !== undefined && object.frontendInfo !== null) {
      message.frontendInfo = FrontendInfo.fromPartial(object.frontendInfo);
    } else {
      message.frontendInfo = undefined;
    }
    if (object.kpn !== undefined && object.kpn !== null) {
      message.kpn = object.kpn;
    } else {
      message.kpn = "";
    }
    if (object.anonymouseUser !== undefined && object.anonymouseUser !== null) {
      message.anonymouseUser = object.anonymouseUser;
    } else {
      message.anonymouseUser = false;
    }
    return message;
  },
  toJSON(message: UpstreamPayload): unknown {
    const obj: any = {};
    message.command !== undefined && (obj.command = message.command);
    message.seqId !== undefined && (obj.seqId = (message.seqId || Long.ZERO).toString());
    message.retryCount !== undefined && (obj.retryCount = message.retryCount);
    message.payloadData !== undefined && (obj.payloadData = base64FromBytes(message.payloadData !== undefined ? message.payloadData : new Uint8Array()));
    message.userInstance !== undefined && (obj.userInstance = message.userInstance ? UserInstance.toJSON(message.userInstance) : undefined);
    message.errorCode !== undefined && (obj.errorCode = message.errorCode);
    message.settingInfo !== undefined && (obj.settingInfo = message.settingInfo ? SettingInfo.toJSON(message.settingInfo) : undefined);
    message.requestBasicInfo !== undefined && (obj.requestBasicInfo = message.requestBasicInfo ? RequestBasicInfo.toJSON(message.requestBasicInfo) : undefined);
    message.subBiz !== undefined && (obj.subBiz = message.subBiz);
    message.frontendInfo !== undefined && (obj.frontendInfo = message.frontendInfo ? FrontendInfo.toJSON(message.frontendInfo) : undefined);
    message.kpn !== undefined && (obj.kpn = message.kpn);
    message.anonymouseUser !== undefined && (obj.anonymouseUser = message.anonymouseUser);
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