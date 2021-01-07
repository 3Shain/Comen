/* eslint-disable */
import { PkPlayerInfo } from './PkPlayerInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalPKReady {
  a: string;
  b: PkPlayerInfo[];
}

const baseCommonStateSignalPKReady: object = {
  a: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalPKReady = {
  encode(message: CommonStateSignalPKReady, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.a);
    for (const v of message.b) {
      PkPlayerInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalPKReady {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalPKReady } as CommonStateSignalPKReady;
    message.b = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.string();
          break;
        case 2:
          message.b.push(PkPlayerInfo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalPKReady {
    const message = { ...baseCommonStateSignalPKReady } as CommonStateSignalPKReady;
    message.b = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = String(object.a);
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      for (const e of object.b) {
        message.b.push(PkPlayerInfo.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalPKReady>): CommonStateSignalPKReady {
    const message = { ...baseCommonStateSignalPKReady } as CommonStateSignalPKReady;
    message.b = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a;
    } else {
      message.a = "";
    }
    if (object.b !== undefined && object.b !== null) {
      for (const e of object.b) {
        message.b.push(PkPlayerInfo.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CommonStateSignalPKReady): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    if (message.b) {
      obj.b = message.b.map(e => e ? PkPlayerInfo.toJSON(e) : undefined);
    } else {
      obj.b = [];
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