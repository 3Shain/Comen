/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface SdkOption {
  reportIntervalSeconds: number;
  reportSecurity: string;
  lz4CompressionThresholdBytes: number;
  netCheckServers: string[];
}

const baseSdkOption: object = {
  reportIntervalSeconds: 0,
  reportSecurity: "",
  lz4CompressionThresholdBytes: 0,
  netCheckServers: "",
};

export const protobufPackage = 'AcFunDanmu'

export const SdkOption = {
  encode(message: SdkOption, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.reportIntervalSeconds);
    writer.uint32(18).string(message.reportSecurity);
    writer.uint32(24).int32(message.lz4CompressionThresholdBytes);
    for (const v of message.netCheckServers) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SdkOption {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSdkOption } as SdkOption;
    message.netCheckServers = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reportIntervalSeconds = reader.int32();
          break;
        case 2:
          message.reportSecurity = reader.string();
          break;
        case 3:
          message.lz4CompressionThresholdBytes = reader.int32();
          break;
        case 4:
          message.netCheckServers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SdkOption {
    const message = { ...baseSdkOption } as SdkOption;
    message.netCheckServers = [];
    if (object.reportIntervalSeconds !== undefined && object.reportIntervalSeconds !== null) {
      message.reportIntervalSeconds = Number(object.reportIntervalSeconds);
    } else {
      message.reportIntervalSeconds = 0;
    }
    if (object.reportSecurity !== undefined && object.reportSecurity !== null) {
      message.reportSecurity = String(object.reportSecurity);
    } else {
      message.reportSecurity = "";
    }
    if (object.lz4CompressionThresholdBytes !== undefined && object.lz4CompressionThresholdBytes !== null) {
      message.lz4CompressionThresholdBytes = Number(object.lz4CompressionThresholdBytes);
    } else {
      message.lz4CompressionThresholdBytes = 0;
    }
    if (object.netCheckServers !== undefined && object.netCheckServers !== null) {
      for (const e of object.netCheckServers) {
        message.netCheckServers.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SdkOption>): SdkOption {
    const message = { ...baseSdkOption } as SdkOption;
    message.netCheckServers = [];
    if (object.reportIntervalSeconds !== undefined && object.reportIntervalSeconds !== null) {
      message.reportIntervalSeconds = object.reportIntervalSeconds;
    } else {
      message.reportIntervalSeconds = 0;
    }
    if (object.reportSecurity !== undefined && object.reportSecurity !== null) {
      message.reportSecurity = object.reportSecurity;
    } else {
      message.reportSecurity = "";
    }
    if (object.lz4CompressionThresholdBytes !== undefined && object.lz4CompressionThresholdBytes !== null) {
      message.lz4CompressionThresholdBytes = object.lz4CompressionThresholdBytes;
    } else {
      message.lz4CompressionThresholdBytes = 0;
    }
    if (object.netCheckServers !== undefined && object.netCheckServers !== null) {
      for (const e of object.netCheckServers) {
        message.netCheckServers.push(e);
      }
    }
    return message;
  },
  toJSON(message: SdkOption): unknown {
    const obj: any = {};
    message.reportIntervalSeconds !== undefined && (obj.reportIntervalSeconds = message.reportIntervalSeconds);
    message.reportSecurity !== undefined && (obj.reportSecurity = message.reportSecurity);
    message.lz4CompressionThresholdBytes !== undefined && (obj.lz4CompressionThresholdBytes = message.lz4CompressionThresholdBytes);
    if (message.netCheckServers) {
      obj.netCheckServers = message.netCheckServers.map(e => e);
    } else {
      obj.netCheckServers = [];
    }
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