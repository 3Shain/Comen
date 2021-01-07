/* eslint-disable */
import { ZtLiveStateSignalItem } from './ZtLiveStateSignalItem';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveScStateSignal {
  item: ZtLiveStateSignalItem[];
}

const baseZtLiveScStateSignal: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveScStateSignal = {
  encode(message: ZtLiveScStateSignal, writer: Writer = Writer.create()): Writer {
    for (const v of message.item) {
      ZtLiveStateSignalItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveScStateSignal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveScStateSignal } as ZtLiveScStateSignal;
    message.item = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.item.push(ZtLiveStateSignalItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveScStateSignal {
    const message = { ...baseZtLiveScStateSignal } as ZtLiveScStateSignal;
    message.item = [];
    if (object.item !== undefined && object.item !== null) {
      for (const e of object.item) {
        message.item.push(ZtLiveStateSignalItem.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveScStateSignal>): ZtLiveScStateSignal {
    const message = { ...baseZtLiveScStateSignal } as ZtLiveScStateSignal;
    message.item = [];
    if (object.item !== undefined && object.item !== null) {
      for (const e of object.item) {
        message.item.push(ZtLiveStateSignalItem.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ZtLiveScStateSignal): unknown {
    const obj: any = {};
    if (message.item) {
      obj.item = message.item.map(e => e ? ZtLiveStateSignalItem.toJSON(e) : undefined);
    } else {
      obj.item = [];
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