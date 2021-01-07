/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface TokenInfo {
  tokenType: TokenInfo_TokenType;
  token: Uint8Array;
}

const baseTokenInfo: object = {
  tokenType: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum TokenInfo_TokenType {
  kInvalid = 0,
  kServiceToken = 1,
  UNRECOGNIZED = -1,
}

export function tokenInfo_TokenTypeFromJSON(object: any): TokenInfo_TokenType {
  switch (object) {
    case 0:
    case "kInvalid":
      return TokenInfo_TokenType.kInvalid;
    case 1:
    case "kServiceToken":
      return TokenInfo_TokenType.kServiceToken;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TokenInfo_TokenType.UNRECOGNIZED;
  }
}

export function tokenInfo_TokenTypeToJSON(object: TokenInfo_TokenType): string {
  switch (object) {
    case TokenInfo_TokenType.kInvalid:
      return "kInvalid";
    case TokenInfo_TokenType.kServiceToken:
      return "kServiceToken";
    default:
      return "UNKNOWN";
  }
}

export const TokenInfo = {
  encode(message: TokenInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.tokenType);
    writer.uint32(18).bytes(message.token);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): TokenInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTokenInfo } as TokenInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenType = reader.int32() as any;
          break;
        case 2:
          message.token = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): TokenInfo {
    const message = { ...baseTokenInfo } as TokenInfo;
    if (object.tokenType !== undefined && object.tokenType !== null) {
      message.tokenType = tokenInfo_TokenTypeFromJSON(object.tokenType);
    } else {
      message.tokenType = 0;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = bytesFromBase64(object.token);
    }
    return message;
  },
  fromPartial(object: DeepPartial<TokenInfo>): TokenInfo {
    const message = { ...baseTokenInfo } as TokenInfo;
    if (object.tokenType !== undefined && object.tokenType !== null) {
      message.tokenType = object.tokenType;
    } else {
      message.tokenType = 0;
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = new Uint8Array();
    }
    return message;
  },
  toJSON(message: TokenInfo): unknown {
    const obj: any = {};
    message.tokenType !== undefined && (obj.tokenType = tokenInfo_TokenTypeToJSON(message.tokenType));
    message.token !== undefined && (obj.token = base64FromBytes(message.token !== undefined ? message.token : new Uint8Array()));
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
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