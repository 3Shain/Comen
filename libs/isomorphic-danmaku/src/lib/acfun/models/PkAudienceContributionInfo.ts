/* eslint-disable */
import * as Long from 'long';
import { PkAudienceContributionDetail } from './PkAudienceContributionDetail';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PkAudienceContributionInfo {
  a: Long;
  b: PkAudienceContributionDetail[];
}

const basePkAudienceContributionInfo: object = {
  a: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const PkAudienceContributionInfo = {
  encode(message: PkAudienceContributionInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.a);
    for (const v of message.b) {
      PkAudienceContributionDetail.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PkAudienceContributionInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePkAudienceContributionInfo } as PkAudienceContributionInfo;
    message.b = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = reader.int64() as Long;
          break;
        case 2:
          message.b.push(PkAudienceContributionDetail.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PkAudienceContributionInfo {
    const message = { ...basePkAudienceContributionInfo } as PkAudienceContributionInfo;
    message.b = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = Long.fromString(object.a);
    } else {
      message.a = Long.ZERO;
    }
    if (object.b !== undefined && object.b !== null) {
      for (const e of object.b) {
        message.b.push(PkAudienceContributionDetail.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<PkAudienceContributionInfo>): PkAudienceContributionInfo {
    const message = { ...basePkAudienceContributionInfo } as PkAudienceContributionInfo;
    message.b = [];
    if (object.a !== undefined && object.a !== null) {
      message.a = object.a as Long;
    } else {
      message.a = Long.ZERO;
    }
    if (object.b !== undefined && object.b !== null) {
      for (const e of object.b) {
        message.b.push(PkAudienceContributionDetail.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: PkAudienceContributionInfo): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = (message.a || Long.ZERO).toString());
    if (message.b) {
      obj.b = message.b.map(e => e ? PkAudienceContributionDetail.toJSON(e) : undefined);
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