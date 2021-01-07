/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtCommonInfo {
  kpn: string;
  kpf: string;
  subBiz: string;
  uid: Long;
  did: string;
  clientIp: Long;
  appVer: string;
  ver: string;
  lat: string;
  lon: string;
  mod: string;
  net: string;
  sys: string;
  c: string;
  language: string;
  countryCode: string;
}

const baseZtCommonInfo: object = {
  kpn: "",
  kpf: "",
  subBiz: "",
  uid: Long.ZERO,
  did: "",
  clientIp: Long.ZERO,
  appVer: "",
  ver: "",
  lat: "",
  lon: "",
  mod: "",
  net: "",
  sys: "",
  c: "",
  language: "",
  countryCode: "",
};

export const protobufPackage = 'AcFunDanmu'

export const ZtCommonInfo = {
  encode(message: ZtCommonInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.kpn);
    writer.uint32(18).string(message.kpf);
    writer.uint32(26).string(message.subBiz);
    writer.uint32(32).int64(message.uid);
    writer.uint32(42).string(message.did);
    writer.uint32(48).int64(message.clientIp);
    writer.uint32(58).string(message.appVer);
    writer.uint32(66).string(message.ver);
    writer.uint32(74).string(message.lat);
    writer.uint32(82).string(message.lon);
    writer.uint32(90).string(message.mod);
    writer.uint32(98).string(message.net);
    writer.uint32(106).string(message.sys);
    writer.uint32(114).string(message.c);
    writer.uint32(122).string(message.language);
    writer.uint32(130).string(message.countryCode);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtCommonInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtCommonInfo } as ZtCommonInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.kpn = reader.string();
          break;
        case 2:
          message.kpf = reader.string();
          break;
        case 3:
          message.subBiz = reader.string();
          break;
        case 4:
          message.uid = reader.int64() as Long;
          break;
        case 5:
          message.did = reader.string();
          break;
        case 6:
          message.clientIp = reader.int64() as Long;
          break;
        case 7:
          message.appVer = reader.string();
          break;
        case 8:
          message.ver = reader.string();
          break;
        case 9:
          message.lat = reader.string();
          break;
        case 10:
          message.lon = reader.string();
          break;
        case 11:
          message.mod = reader.string();
          break;
        case 12:
          message.net = reader.string();
          break;
        case 13:
          message.sys = reader.string();
          break;
        case 14:
          message.c = reader.string();
          break;
        case 15:
          message.language = reader.string();
          break;
        case 16:
          message.countryCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtCommonInfo {
    const message = { ...baseZtCommonInfo } as ZtCommonInfo;
    if (object.kpn !== undefined && object.kpn !== null) {
      message.kpn = String(object.kpn);
    } else {
      message.kpn = "";
    }
    if (object.kpf !== undefined && object.kpf !== null) {
      message.kpf = String(object.kpf);
    } else {
      message.kpf = "";
    }
    if (object.subBiz !== undefined && object.subBiz !== null) {
      message.subBiz = String(object.subBiz);
    } else {
      message.subBiz = "";
    }
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = Long.fromString(object.uid);
    } else {
      message.uid = Long.ZERO;
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = String(object.did);
    } else {
      message.did = "";
    }
    if (object.clientIp !== undefined && object.clientIp !== null) {
      message.clientIp = Long.fromString(object.clientIp);
    } else {
      message.clientIp = Long.ZERO;
    }
    if (object.appVer !== undefined && object.appVer !== null) {
      message.appVer = String(object.appVer);
    } else {
      message.appVer = "";
    }
    if (object.ver !== undefined && object.ver !== null) {
      message.ver = String(object.ver);
    } else {
      message.ver = "";
    }
    if (object.lat !== undefined && object.lat !== null) {
      message.lat = String(object.lat);
    } else {
      message.lat = "";
    }
    if (object.lon !== undefined && object.lon !== null) {
      message.lon = String(object.lon);
    } else {
      message.lon = "";
    }
    if (object.mod !== undefined && object.mod !== null) {
      message.mod = String(object.mod);
    } else {
      message.mod = "";
    }
    if (object.net !== undefined && object.net !== null) {
      message.net = String(object.net);
    } else {
      message.net = "";
    }
    if (object.sys !== undefined && object.sys !== null) {
      message.sys = String(object.sys);
    } else {
      message.sys = "";
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = String(object.c);
    } else {
      message.c = "";
    }
    if (object.language !== undefined && object.language !== null) {
      message.language = String(object.language);
    } else {
      message.language = "";
    }
    if (object.countryCode !== undefined && object.countryCode !== null) {
      message.countryCode = String(object.countryCode);
    } else {
      message.countryCode = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtCommonInfo>): ZtCommonInfo {
    const message = { ...baseZtCommonInfo } as ZtCommonInfo;
    if (object.kpn !== undefined && object.kpn !== null) {
      message.kpn = object.kpn;
    } else {
      message.kpn = "";
    }
    if (object.kpf !== undefined && object.kpf !== null) {
      message.kpf = object.kpf;
    } else {
      message.kpf = "";
    }
    if (object.subBiz !== undefined && object.subBiz !== null) {
      message.subBiz = object.subBiz;
    } else {
      message.subBiz = "";
    }
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = object.uid as Long;
    } else {
      message.uid = Long.ZERO;
    }
    if (object.did !== undefined && object.did !== null) {
      message.did = object.did;
    } else {
      message.did = "";
    }
    if (object.clientIp !== undefined && object.clientIp !== null) {
      message.clientIp = object.clientIp as Long;
    } else {
      message.clientIp = Long.ZERO;
    }
    if (object.appVer !== undefined && object.appVer !== null) {
      message.appVer = object.appVer;
    } else {
      message.appVer = "";
    }
    if (object.ver !== undefined && object.ver !== null) {
      message.ver = object.ver;
    } else {
      message.ver = "";
    }
    if (object.lat !== undefined && object.lat !== null) {
      message.lat = object.lat;
    } else {
      message.lat = "";
    }
    if (object.lon !== undefined && object.lon !== null) {
      message.lon = object.lon;
    } else {
      message.lon = "";
    }
    if (object.mod !== undefined && object.mod !== null) {
      message.mod = object.mod;
    } else {
      message.mod = "";
    }
    if (object.net !== undefined && object.net !== null) {
      message.net = object.net;
    } else {
      message.net = "";
    }
    if (object.sys !== undefined && object.sys !== null) {
      message.sys = object.sys;
    } else {
      message.sys = "";
    }
    if (object.c !== undefined && object.c !== null) {
      message.c = object.c;
    } else {
      message.c = "";
    }
    if (object.language !== undefined && object.language !== null) {
      message.language = object.language;
    } else {
      message.language = "";
    }
    if (object.countryCode !== undefined && object.countryCode !== null) {
      message.countryCode = object.countryCode;
    } else {
      message.countryCode = "";
    }
    return message;
  },
  toJSON(message: ZtCommonInfo): unknown {
    const obj: any = {};
    message.kpn !== undefined && (obj.kpn = message.kpn);
    message.kpf !== undefined && (obj.kpf = message.kpf);
    message.subBiz !== undefined && (obj.subBiz = message.subBiz);
    message.uid !== undefined && (obj.uid = (message.uid || Long.ZERO).toString());
    message.did !== undefined && (obj.did = message.did);
    message.clientIp !== undefined && (obj.clientIp = (message.clientIp || Long.ZERO).toString());
    message.appVer !== undefined && (obj.appVer = message.appVer);
    message.ver !== undefined && (obj.ver = message.ver);
    message.lat !== undefined && (obj.lat = message.lat);
    message.lon !== undefined && (obj.lon = message.lon);
    message.mod !== undefined && (obj.mod = message.mod);
    message.net !== undefined && (obj.net = message.net);
    message.sys !== undefined && (obj.sys = message.sys);
    message.c !== undefined && (obj.c = message.c);
    message.language !== undefined && (obj.language = message.language);
    message.countryCode !== undefined && (obj.countryCode = message.countryCode);
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