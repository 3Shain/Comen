/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface UnregisterRequest {
}

export interface UnregisterResponse {
}

const baseUnregisterRequest: object = {
};

const baseUnregisterResponse: object = {
};

export const protobufPackage = 'AcFunDanmu'

export const UnregisterRequest = {
  encode(_: UnregisterRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UnregisterRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUnregisterRequest } as UnregisterRequest;
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
  fromJSON(_: any): UnregisterRequest {
    const message = { ...baseUnregisterRequest } as UnregisterRequest;
    return message;
  },
  fromPartial(_: DeepPartial<UnregisterRequest>): UnregisterRequest {
    const message = { ...baseUnregisterRequest } as UnregisterRequest;
    return message;
  },
  toJSON(_: UnregisterRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

export const UnregisterResponse = {
  encode(_: UnregisterResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): UnregisterResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUnregisterResponse } as UnregisterResponse;
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
  fromJSON(_: any): UnregisterResponse {
    const message = { ...baseUnregisterResponse } as UnregisterResponse;
    return message;
  },
  fromPartial(_: DeepPartial<UnregisterResponse>): UnregisterResponse {
    const message = { ...baseUnregisterResponse } as UnregisterResponse;
    return message;
  },
  toJSON(_: UnregisterResponse): unknown {
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