/* eslint-disable */
import { ZtLiveNotifySignalItem } from './ZtLiveNotifySignalItem';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveScNotifySignal {
  item: ZtLiveNotifySignalItem[];
}

const baseZtLiveScNotifySignal: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveScNotifySignal = {
  encode(message: ZtLiveScNotifySignal, writer: Writer = Writer.create()): Writer {
    for (const v of message.item) {
      ZtLiveNotifySignalItem.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveScNotifySignal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveScNotifySignal } as ZtLiveScNotifySignal;
    message.item = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.item.push(ZtLiveNotifySignalItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveScNotifySignal {
    const message = { ...baseZtLiveScNotifySignal } as ZtLiveScNotifySignal;
    message.item = [];
    if (object.item !== undefined && object.item !== null) {
      for (const e of object.item) {
        message.item.push(ZtLiveNotifySignalItem.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveScNotifySignal>): ZtLiveScNotifySignal {
    const message = { ...baseZtLiveScNotifySignal } as ZtLiveScNotifySignal;
    message.item = [];
    if (object.item !== undefined && object.item !== null) {
      for (const e of object.item) {
        message.item.push(ZtLiveNotifySignalItem.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ZtLiveScNotifySignal): unknown {
    const obj: any = {};
    if (message.item) {
      obj.item = message.item.map(e => e ? ZtLiveNotifySignalItem.toJSON(e) : undefined);
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