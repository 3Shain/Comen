/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonNotifySignalKickedOut {
  reason: string;
}

const baseCommonNotifySignalKickedOut: object = {
  reason: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonNotifySignalKickedOut = {
  encode(message: CommonNotifySignalKickedOut, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.reason);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonNotifySignalKickedOut {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonNotifySignalKickedOut } as CommonNotifySignalKickedOut;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonNotifySignalKickedOut {
    const message = { ...baseCommonNotifySignalKickedOut } as CommonNotifySignalKickedOut;
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = String(object.reason);
    } else {
      message.reason = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonNotifySignalKickedOut>): CommonNotifySignalKickedOut {
    const message = { ...baseCommonNotifySignalKickedOut } as CommonNotifySignalKickedOut;
    if (object.reason !== undefined && object.reason !== null) {
      message.reason = object.reason;
    } else {
      message.reason = "";
    }
    return message;
  },
  toJSON(message: CommonNotifySignalKickedOut): unknown {
    const obj: any = {};
    message.reason !== undefined && (obj.reason = message.reason);
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