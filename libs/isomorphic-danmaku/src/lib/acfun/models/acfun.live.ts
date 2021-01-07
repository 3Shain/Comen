/* eslint-disable */
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface AcFunUserInfo {
  userId: Long;
  name: string;
}

export interface AcfunActionSignalThrowBanana {
  visitor: AcFunUserInfo | undefined;
  count: number;
  sendTimeMs: Long;
}

export interface AcfunStateSignalDisplayInfo {
  bananaCount: string;
}

export interface AcfunActionSignalJoinClub {
  fansInfo: AcFunUserInfo | undefined;
  uperInfo: AcFunUserInfo | undefined;
  joinTimeMs: Long;
}

const baseAcFunUserInfo: object = {
  userId: Long.ZERO,
  name: "",
};

const baseAcfunActionSignalThrowBanana: object = {
  count: 0,
  sendTimeMs: Long.ZERO,
};

const baseAcfunStateSignalDisplayInfo: object = {
  bananaCount: "",
};

const baseAcfunActionSignalJoinClub: object = {
  joinTimeMs: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const AcFunUserInfo = {
  encode(message: AcFunUserInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.userId);
    writer.uint32(18).string(message.name);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AcFunUserInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAcFunUserInfo } as AcFunUserInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.int64() as Long;
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AcFunUserInfo {
    const message = { ...baseAcFunUserInfo } as AcFunUserInfo;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = Long.fromString(object.userId);
    } else {
      message.userId = Long.ZERO;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<AcFunUserInfo>): AcFunUserInfo {
    const message = { ...baseAcFunUserInfo } as AcFunUserInfo;
    if (object.userId !== undefined && object.userId !== null) {
      message.userId = object.userId as Long;
    } else {
      message.userId = Long.ZERO;
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
  toJSON(message: AcFunUserInfo): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = (message.userId || Long.ZERO).toString());
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

export const AcfunActionSignalThrowBanana = {
  encode(message: AcfunActionSignalThrowBanana, writer: Writer = Writer.create()): Writer {
    if (message.visitor !== undefined && message.visitor !== undefined) {
      AcFunUserInfo.encode(message.visitor, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int32(message.count);
    writer.uint32(24).int64(message.sendTimeMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AcfunActionSignalThrowBanana {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAcfunActionSignalThrowBanana } as AcfunActionSignalThrowBanana;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.visitor = AcFunUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.count = reader.int32();
          break;
        case 3:
          message.sendTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AcfunActionSignalThrowBanana {
    const message = { ...baseAcfunActionSignalThrowBanana } as AcfunActionSignalThrowBanana;
    if (object.visitor !== undefined && object.visitor !== null) {
      message.visitor = AcFunUserInfo.fromJSON(object.visitor);
    } else {
      message.visitor = undefined;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = Number(object.count);
    } else {
      message.count = 0;
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = Long.fromString(object.sendTimeMs);
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AcfunActionSignalThrowBanana>): AcfunActionSignalThrowBanana {
    const message = { ...baseAcfunActionSignalThrowBanana } as AcfunActionSignalThrowBanana;
    if (object.visitor !== undefined && object.visitor !== null) {
      message.visitor = AcFunUserInfo.fromPartial(object.visitor);
    } else {
      message.visitor = undefined;
    }
    if (object.count !== undefined && object.count !== null) {
      message.count = object.count;
    } else {
      message.count = 0;
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = object.sendTimeMs as Long;
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: AcfunActionSignalThrowBanana): unknown {
    const obj: any = {};
    message.visitor !== undefined && (obj.visitor = message.visitor ? AcFunUserInfo.toJSON(message.visitor) : undefined);
    message.count !== undefined && (obj.count = message.count);
    message.sendTimeMs !== undefined && (obj.sendTimeMs = (message.sendTimeMs || Long.ZERO).toString());
    return obj;
  },
};

export const AcfunStateSignalDisplayInfo = {
  encode(message: AcfunStateSignalDisplayInfo, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.bananaCount);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AcfunStateSignalDisplayInfo {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAcfunStateSignalDisplayInfo } as AcfunStateSignalDisplayInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bananaCount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AcfunStateSignalDisplayInfo {
    const message = { ...baseAcfunStateSignalDisplayInfo } as AcfunStateSignalDisplayInfo;
    if (object.bananaCount !== undefined && object.bananaCount !== null) {
      message.bananaCount = String(object.bananaCount);
    } else {
      message.bananaCount = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<AcfunStateSignalDisplayInfo>): AcfunStateSignalDisplayInfo {
    const message = { ...baseAcfunStateSignalDisplayInfo } as AcfunStateSignalDisplayInfo;
    if (object.bananaCount !== undefined && object.bananaCount !== null) {
      message.bananaCount = object.bananaCount;
    } else {
      message.bananaCount = "";
    }
    return message;
  },
  toJSON(message: AcfunStateSignalDisplayInfo): unknown {
    const obj: any = {};
    message.bananaCount !== undefined && (obj.bananaCount = message.bananaCount);
    return obj;
  },
};

export const AcfunActionSignalJoinClub = {
  encode(message: AcfunActionSignalJoinClub, writer: Writer = Writer.create()): Writer {
    if (message.fansInfo !== undefined && message.fansInfo !== undefined) {
      AcFunUserInfo.encode(message.fansInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.uperInfo !== undefined && message.uperInfo !== undefined) {
      AcFunUserInfo.encode(message.uperInfo, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int64(message.joinTimeMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AcfunActionSignalJoinClub {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAcfunActionSignalJoinClub } as AcfunActionSignalJoinClub;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fansInfo = AcFunUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.uperInfo = AcFunUserInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.joinTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AcfunActionSignalJoinClub {
    const message = { ...baseAcfunActionSignalJoinClub } as AcfunActionSignalJoinClub;
    if (object.fansInfo !== undefined && object.fansInfo !== null) {
      message.fansInfo = AcFunUserInfo.fromJSON(object.fansInfo);
    } else {
      message.fansInfo = undefined;
    }
    if (object.uperInfo !== undefined && object.uperInfo !== null) {
      message.uperInfo = AcFunUserInfo.fromJSON(object.uperInfo);
    } else {
      message.uperInfo = undefined;
    }
    if (object.joinTimeMs !== undefined && object.joinTimeMs !== null) {
      message.joinTimeMs = Long.fromString(object.joinTimeMs);
    } else {
      message.joinTimeMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AcfunActionSignalJoinClub>): AcfunActionSignalJoinClub {
    const message = { ...baseAcfunActionSignalJoinClub } as AcfunActionSignalJoinClub;
    if (object.fansInfo !== undefined && object.fansInfo !== null) {
      message.fansInfo = AcFunUserInfo.fromPartial(object.fansInfo);
    } else {
      message.fansInfo = undefined;
    }
    if (object.uperInfo !== undefined && object.uperInfo !== null) {
      message.uperInfo = AcFunUserInfo.fromPartial(object.uperInfo);
    } else {
      message.uperInfo = undefined;
    }
    if (object.joinTimeMs !== undefined && object.joinTimeMs !== null) {
      message.joinTimeMs = object.joinTimeMs as Long;
    } else {
      message.joinTimeMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: AcfunActionSignalJoinClub): unknown {
    const obj: any = {};
    message.fansInfo !== undefined && (obj.fansInfo = message.fansInfo ? AcFunUserInfo.toJSON(message.fansInfo) : undefined);
    message.uperInfo !== undefined && (obj.uperInfo = message.uperInfo ? AcFunUserInfo.toJSON(message.uperInfo) : undefined);
    message.joinTimeMs !== undefined && (obj.joinTimeMs = (message.joinTimeMs || Long.ZERO).toString());
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