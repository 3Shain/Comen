/* eslint-disable */
import { CommonActionSignalComment } from './CommonActionSignalComment';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalRecentComment {
  comment: CommonActionSignalComment[];
}

const baseCommonStateSignalRecentComment: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalRecentComment = {
  encode(message: CommonStateSignalRecentComment, writer: Writer = Writer.create()): Writer {
    for (const v of message.comment) {
      CommonActionSignalComment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalRecentComment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalRecentComment } as CommonStateSignalRecentComment;
    message.comment = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.comment.push(CommonActionSignalComment.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalRecentComment {
    const message = { ...baseCommonStateSignalRecentComment } as CommonStateSignalRecentComment;
    message.comment = [];
    if (object.comment !== undefined && object.comment !== null) {
      for (const e of object.comment) {
        message.comment.push(CommonActionSignalComment.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalRecentComment>): CommonStateSignalRecentComment {
    const message = { ...baseCommonStateSignalRecentComment } as CommonStateSignalRecentComment;
    message.comment = [];
    if (object.comment !== undefined && object.comment !== null) {
      for (const e of object.comment) {
        message.comment.push(CommonActionSignalComment.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: CommonStateSignalRecentComment): unknown {
    const obj: any = {};
    if (message.comment) {
      obj.comment = message.comment.map(e => e ? CommonActionSignalComment.toJSON(e) : undefined);
    } else {
      obj.comment = [];
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