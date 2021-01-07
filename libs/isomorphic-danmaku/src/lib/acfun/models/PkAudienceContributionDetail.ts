/* eslint-disable */
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PkAudienceContributionDetail {
  a: ZtLiveUserInfo | undefined;
  b: Long;
}

const basePkAudienceContributionDetail: object = {
  b: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const PkAudienceContributionDetail = {
  encode(message: PkAudienceContributionDetail, writer: Writer = Writer.create()): Writer {
    if (message.a !== undefined && message.a !== undefined) {
      ZtLiveUserInfo.encode(message.a, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.b);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PkAudienceContributionDetail {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePkAudienceContributionDetail } as PkAudienceContributionDetail;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.a = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.b = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PkAudienceContributionDetail {
    const message = { ...basePkAudienceContributionDetail } as PkAudienceContributionDetail;
    if (object.a !== undefined && object.a !== null) {
      message.a = ZtLiveUserInfo.fromJSON(object.a);
    } else {
      message.a = undefined;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = Long.fromString(object.b);
    } else {
      message.b = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PkAudienceContributionDetail>): PkAudienceContributionDetail {
    const message = { ...basePkAudienceContributionDetail } as PkAudienceContributionDetail;
    if (object.a !== undefined && object.a !== null) {
      message.a = ZtLiveUserInfo.fromPartial(object.a);
    } else {
      message.a = undefined;
    }
    if (object.b !== undefined && object.b !== null) {
      message.b = object.b as Long;
    } else {
      message.b = Long.ZERO;
    }
    return message;
  },
  toJSON(message: PkAudienceContributionDetail): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a ? ZtLiveUserInfo.toJSON(message.a) : undefined);
    message.b !== undefined && (obj.b = (message.b || Long.ZERO).toString());
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