/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveCsUserExit {
}

export interface ZtLiveCsUserExitAck {
}

const baseZtLiveCsUserExit: object = {
};

const baseZtLiveCsUserExitAck: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveCsUserExit = {
  encode(_: ZtLiveCsUserExit, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsUserExit {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsUserExit } as ZtLiveCsUserExit;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ZtLiveCsUserExit {
    const message = { ...baseZtLiveCsUserExit } as ZtLiveCsUserExit;
    return message;
  },
  fromPartial(_: DeepPartial<ZtLiveCsUserExit>): ZtLiveCsUserExit {
    const message = { ...baseZtLiveCsUserExit } as ZtLiveCsUserExit;
    return message;
  },
  toJSON(_: ZtLiveCsUserExit): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ZtLiveCsUserExitAck = {
  encode(_: ZtLiveCsUserExitAck, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsUserExitAck {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsUserExitAck } as ZtLiveCsUserExitAck;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ZtLiveCsUserExitAck {
    const message = { ...baseZtLiveCsUserExitAck } as ZtLiveCsUserExitAck;
    return message;
  },
  fromPartial(_: DeepPartial<ZtLiveCsUserExitAck>): ZtLiveCsUserExitAck {
    const message = { ...baseZtLiveCsUserExitAck } as ZtLiveCsUserExitAck;
    return message;
  },
  toJSON(_: ZtLiveCsUserExitAck): unknown {
    const obj: any = {};
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