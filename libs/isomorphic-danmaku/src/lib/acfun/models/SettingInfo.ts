/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface SettingInfo {
  locale: string;
  timezone: number;
}

const baseSettingInfo: object = {
  locale: "",
  timezone: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const SettingInfo = {
  encode(message: SettingInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.locale);
    writer.uint32(16).sint32(message.timezone);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SettingInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSettingInfo } as SettingInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.locale = reader.string();
          break;
        case 2:
          message.timezone = reader.sint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SettingInfo {
    const message = { ...baseSettingInfo } as SettingInfo;
    if (object.locale !== undefined && object.locale !== null) {
      message.locale = String(object.locale);
    } else {
      message.locale = "";
    }
    if (object.timezone !== undefined && object.timezone !== null) {
      message.timezone = Number(object.timezone);
    } else {
      message.timezone = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SettingInfo>): SettingInfo {
    const message = { ...baseSettingInfo } as SettingInfo;
    if (object.locale !== undefined && object.locale !== null) {
      message.locale = object.locale;
    } else {
      message.locale = "";
    }
    if (object.timezone !== undefined && object.timezone !== null) {
      message.timezone = object.timezone;
    } else {
      message.timezone = 0;
    }
    return message;
  },
  toJSON(message: SettingInfo): unknown {
    const obj: any = {};
    message.locale !== undefined && (obj.locale = message.locale);
    message.timezone !== undefined && (obj.timezone = message.timezone);
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