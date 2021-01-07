/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface PingRequest {
  pingType: PingRequest_PingType;
  pingRound: number;
}

export interface PingResponse {
  serverTimestamp: number;
  clientIp: number;
  redirectIp: number;
  redirectPort: number;
}

const basePingRequest: object = {
  pingType: 0,
  pingRound: 0,
};

const basePingResponse: object = {
  serverTimestamp: 0,
  clientIp: 0,
  redirectIp: 0,
  redirectPort: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum PingRequest_PingType {
  kInvalid = 0,
  kPriorRegister = 1,
  kPostRegister = 2,
  UNRECOGNIZED = -1,
}

export function pingRequest_PingTypeFromJSON(object: any): PingRequest_PingType {
  switch (object) {
    case 0:
    case "kInvalid":
      return PingRequest_PingType.kInvalid;
    case 1:
    case "kPriorRegister":
      return PingRequest_PingType.kPriorRegister;
    case 2:
    case "kPostRegister":
      return PingRequest_PingType.kPostRegister;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PingRequest_PingType.UNRECOGNIZED;
  }
}

export function pingRequest_PingTypeToJSON(object: PingRequest_PingType): string {
  switch (object) {
    case PingRequest_PingType.kInvalid:
      return "kInvalid";
    case PingRequest_PingType.kPriorRegister:
      return "kPriorRegister";
    case PingRequest_PingType.kPostRegister:
      return "kPostRegister";
    default:
      return "UNKNOWN";
  }
}

export const PingRequest = {
  encode(message: PingRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.pingType);
    writer.uint32(16).uint32(message.pingRound);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PingRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePingRequest } as PingRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pingType = reader.int32() as any;
          break;
        case 2:
          message.pingRound = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PingRequest {
    const message = { ...basePingRequest } as PingRequest;
    if (object.pingType !== undefined && object.pingType !== null) {
      message.pingType = pingRequest_PingTypeFromJSON(object.pingType);
    } else {
      message.pingType = 0;
    }
    if (object.pingRound !== undefined && object.pingRound !== null) {
      message.pingRound = Number(object.pingRound);
    } else {
      message.pingRound = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PingRequest>): PingRequest {
    const message = { ...basePingRequest } as PingRequest;
    if (object.pingType !== undefined && object.pingType !== null) {
      message.pingType = object.pingType;
    } else {
      message.pingType = 0;
    }
    if (object.pingRound !== undefined && object.pingRound !== null) {
      message.pingRound = object.pingRound;
    } else {
      message.pingRound = 0;
    }
    return message;
  },
  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    message.pingType !== undefined && (obj.pingType = pingRequest_PingTypeToJSON(message.pingType));
    message.pingRound !== undefined && (obj.pingRound = message.pingRound);
    return obj;
  },
};

export const PingResponse = {
  encode(message: PingResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(13).sfixed32(message.serverTimestamp);
    writer.uint32(21).fixed32(message.clientIp);
    writer.uint32(29).fixed32(message.redirectIp);
    writer.uint32(32).uint32(message.redirectPort);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PingResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePingResponse } as PingResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverTimestamp = reader.sfixed32();
          break;
        case 2:
          message.clientIp = reader.fixed32();
          break;
        case 3:
          message.redirectIp = reader.fixed32();
          break;
        case 4:
          message.redirectPort = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PingResponse {
    const message = { ...basePingResponse } as PingResponse;
    if (object.serverTimestamp !== undefined && object.serverTimestamp !== null) {
      message.serverTimestamp = Number(object.serverTimestamp);
    } else {
      message.serverTimestamp = 0;
    }
    if (object.clientIp !== undefined && object.clientIp !== null) {
      message.clientIp = Number(object.clientIp);
    } else {
      message.clientIp = 0;
    }
    if (object.redirectIp !== undefined && object.redirectIp !== null) {
      message.redirectIp = Number(object.redirectIp);
    } else {
      message.redirectIp = 0;
    }
    if (object.redirectPort !== undefined && object.redirectPort !== null) {
      message.redirectPort = Number(object.redirectPort);
    } else {
      message.redirectPort = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<PingResponse>): PingResponse {
    const message = { ...basePingResponse } as PingResponse;
    if (object.serverTimestamp !== undefined && object.serverTimestamp !== null) {
      message.serverTimestamp = object.serverTimestamp;
    } else {
      message.serverTimestamp = 0;
    }
    if (object.clientIp !== undefined && object.clientIp !== null) {
      message.clientIp = object.clientIp;
    } else {
      message.clientIp = 0;
    }
    if (object.redirectIp !== undefined && object.redirectIp !== null) {
      message.redirectIp = object.redirectIp;
    } else {
      message.redirectIp = 0;
    }
    if (object.redirectPort !== undefined && object.redirectPort !== null) {
      message.redirectPort = object.redirectPort;
    } else {
      message.redirectPort = 0;
    }
    return message;
  },
  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    message.serverTimestamp !== undefined && (obj.serverTimestamp = message.serverTimestamp);
    message.clientIp !== undefined && (obj.clientIp = message.clientIp);
    message.redirectIp !== undefined && (obj.redirectIp = message.redirectIp);
    message.redirectPort !== undefined && (obj.redirectPort = message.redirectPort);
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