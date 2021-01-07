/* eslint-disable */
import { LiveFeatureState } from './LiveFeatureState';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalFeatureStateSync {
  featureState: LiveFeatureState[];
}

const baseCommonStateSignalFeatureStateSync: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalFeatureStateSync = {
  encode(message: CommonStateSignalFeatureStateSync, writer: Writer = Writer.create()): Writer {
    for (const v of message.featureState) {
      LiveFeatureState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalFeatureStateSync {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalFeatureStateSync } as CommonStateSignalFeatureStateSync;
    message.featureState = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.featureState.push(LiveFeatureState.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalFeatureStateSync {
    const message = { ...baseCommonStateSignalFeatureStateSync } as CommonStateSignalFeatureStateSync;
    message.featureState = [];
    if (object.featureState !== undefined && object.featureState !== null) {
      for (const e of object.featureState) {
        message.featureState.push(LiveFeatureState.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalFeatureStateSync>): CommonStateSignalFeatureStateSync {
    const message = { ...baseCommonStateSignalFeatureStateSync } as CommonStateSignalFeatureStateSync;
    message.featureState = [];
    if (object.featureState !== undefined && object.featureState !== null) {
      for (const e of object.featureState) {
        message.featureState.push(LiveFeatureState.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CommonStateSignalFeatureStateSync): unknown {
    const obj: any = {};
    if (message.featureState) {
      obj.featureState = message.featureState.map(e => e ? LiveFeatureState.toJSON(e) : undefined);
    } else {
      obj.featureState = [];
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