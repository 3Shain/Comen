/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface ZtLiveCsHeartbeat {
  clientTimestampMs: Long;
  sequence: Long;
}

export interface ZtLiveCsHeartbeatAck {
  serverTimestampMs: Long;
  clientTimestampMs: Long;
  clientSequence: Long;
}

const baseZtLiveCsHeartbeat: object = {
  clientTimestampMs: Long.ZERO,
  sequence: Long.ZERO,
};

const baseZtLiveCsHeartbeatAck: object = {
  serverTimestampMs: Long.ZERO,
  clientTimestampMs: Long.ZERO,
  clientSequence: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const ZtLiveCsHeartbeat = {
  encode(message: ZtLiveCsHeartbeat, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.clientTimestampMs);
    writer.uint32(16).int64(message.sequence);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsHeartbeat {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsHeartbeat } as ZtLiveCsHeartbeat;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientTimestampMs = reader.int64() as Long;
          break;
        case 2:
          message.sequence = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveCsHeartbeat {
    const message = { ...baseZtLiveCsHeartbeat } as ZtLiveCsHeartbeat;
    if (object.clientTimestampMs !== undefined && object.clientTimestampMs !== null) {
      message.clientTimestampMs = Long.fromString(object.clientTimestampMs);
    } else {
      message.clientTimestampMs = Long.ZERO;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveCsHeartbeat>): ZtLiveCsHeartbeat {
    const message = { ...baseZtLiveCsHeartbeat } as ZtLiveCsHeartbeat;
    if (object.clientTimestampMs !== undefined && object.clientTimestampMs !== null) {
      message.clientTimestampMs = object.clientTimestampMs as Long;
    } else {
      message.clientTimestampMs = Long.ZERO;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.ZERO;
    }
    return message;
  },
  toJSON(message: ZtLiveCsHeartbeat): unknown {
    const obj: any = {};
    message.clientTimestampMs !== undefined && (obj.clientTimestampMs = (message.clientTimestampMs || Long.ZERO).toString());
    message.sequence !== undefined && (obj.sequence = (message.sequence || Long.ZERO).toString());
    return obj;
  },
};

export const ZtLiveCsHeartbeatAck = {
  encode(message: ZtLiveCsHeartbeatAck, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.serverTimestampMs);
    writer.uint32(16).int64(message.clientTimestampMs);
    writer.uint32(24).int64(message.clientSequence);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ZtLiveCsHeartbeatAck {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseZtLiveCsHeartbeatAck } as ZtLiveCsHeartbeatAck;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverTimestampMs = reader.int64() as Long;
          break;
        case 2:
          message.clientTimestampMs = reader.int64() as Long;
          break;
        case 3:
          message.clientSequence = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ZtLiveCsHeartbeatAck {
    const message = { ...baseZtLiveCsHeartbeatAck } as ZtLiveCsHeartbeatAck;
    if (object.serverTimestampMs !== undefined && object.serverTimestampMs !== null) {
      message.serverTimestampMs = Long.fromString(object.serverTimestampMs);
    } else {
      message.serverTimestampMs = Long.ZERO;
    }
    if (object.clientTimestampMs !== undefined && object.clientTimestampMs !== null) {
      message.clientTimestampMs = Long.fromString(object.clientTimestampMs);
    } else {
      message.clientTimestampMs = Long.ZERO;
    }
    if (object.clientSequence !== undefined && object.clientSequence !== null) {
      message.clientSequence = Long.fromString(object.clientSequence);
    } else {
      message.clientSequence = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ZtLiveCsHeartbeatAck>): ZtLiveCsHeartbeatAck {
    const message = { ...baseZtLiveCsHeartbeatAck } as ZtLiveCsHeartbeatAck;
    if (object.serverTimestampMs !== undefined && object.serverTimestampMs !== null) {
      message.serverTimestampMs = object.serverTimestampMs as Long;
    } else {
      message.serverTimestampMs = Long.ZERO;
    }
    if (object.clientTimestampMs !== undefined && object.clientTimestampMs !== null) {
      message.clientTimestampMs = object.clientTimestampMs as Long;
    } else {
      message.clientTimestampMs = Long.ZERO;
    }
    if (object.clientSequence !== undefined && object.clientSequence !== null) {
      message.clientSequence = object.clientSequence as Long;
    } else {
      message.clientSequence = Long.ZERO;
    }
    return message;
  },
  toJSON(message: ZtLiveCsHeartbeatAck): unknown {
    const obj: any = {};
    message.serverTimestampMs !== undefined && (obj.serverTimestampMs = (message.serverTimestampMs || Long.ZERO).toString());
    message.clientTimestampMs !== undefined && (obj.clientTimestampMs = (message.clientTimestampMs || Long.ZERO).toString());
    message.clientSequence !== undefined && (obj.clientSequence = (message.clientSequence || Long.ZERO).toString());
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