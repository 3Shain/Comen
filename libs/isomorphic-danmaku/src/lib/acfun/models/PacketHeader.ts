/* eslint-disable */
import * as Long from 'long';
import { TokenInfo } from './TokenInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface PacketHeader {
  appId: number;
  uid: Long;
  instanceId: Long;
  flags: number;
  encodingType: PacketHeader_EncodingType;
  decodedPayloadLen: number;
  encryptionMode: PacketHeader_EncryptionMode;
  tokenInfo: TokenInfo | undefined;
  seqId: Long;
  features: PacketHeader_Feature[];
  kpn: string;
}

const basePacketHeader: object = {
  appId: 0,
  uid: Long.ZERO,
  instanceId: Long.ZERO,
  flags: 0,
  encodingType: 0,
  decodedPayloadLen: 0,
  encryptionMode: 0,
  seqId: Long.ZERO,
  features: 0,
  kpn: "",
};

export const protobufPackage = 'AcFunDanmu'

export enum PacketHeader_Flags {
  kDirUpstream = 0,
  kDirDownstream = 1,
  kDirMask = 1,
  UNRECOGNIZED = -1,
}

export function packetHeader_FlagsFromJSON(object: any): PacketHeader_Flags {
  switch (object) {
    case 0:
    case "kDirUpstream":
      return PacketHeader_Flags.kDirUpstream;
    case 1:
    case "kDirDownstream":
      return PacketHeader_Flags.kDirDownstream;
    case 1:
    case "kDirMask":
      return PacketHeader_Flags.kDirMask;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PacketHeader_Flags.UNRECOGNIZED;
  }
}

export function packetHeader_FlagsToJSON(object: PacketHeader_Flags): string {
  switch (object) {
    case PacketHeader_Flags.kDirUpstream:
      return "kDirUpstream";
    case PacketHeader_Flags.kDirDownstream:
      return "kDirDownstream";
    case PacketHeader_Flags.kDirMask:
      return "kDirMask";
    default:
      return "UNKNOWN";
  }
}

export enum PacketHeader_EncodingType {
  kEncodingNone = 0,
  kEncodingLz4 = 1,
  UNRECOGNIZED = -1,
}

export function packetHeader_EncodingTypeFromJSON(object: any): PacketHeader_EncodingType {
  switch (object) {
    case 0:
    case "kEncodingNone":
      return PacketHeader_EncodingType.kEncodingNone;
    case 1:
    case "kEncodingLz4":
      return PacketHeader_EncodingType.kEncodingLz4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PacketHeader_EncodingType.UNRECOGNIZED;
  }
}

export function packetHeader_EncodingTypeToJSON(object: PacketHeader_EncodingType): string {
  switch (object) {
    case PacketHeader_EncodingType.kEncodingNone:
      return "kEncodingNone";
    case PacketHeader_EncodingType.kEncodingLz4:
      return "kEncodingLz4";
    default:
      return "UNKNOWN";
  }
}

export enum PacketHeader_EncryptionMode {
  kEncryptionNone = 0,
  kEncryptionServiceToken = 1,
  kEncryptionSessionKey = 2,
  UNRECOGNIZED = -1,
}

export function packetHeader_EncryptionModeFromJSON(object: any): PacketHeader_EncryptionMode {
  switch (object) {
    case 0:
    case "kEncryptionNone":
      return PacketHeader_EncryptionMode.kEncryptionNone;
    case 1:
    case "kEncryptionServiceToken":
      return PacketHeader_EncryptionMode.kEncryptionServiceToken;
    case 2:
    case "kEncryptionSessionKey":
      return PacketHeader_EncryptionMode.kEncryptionSessionKey;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PacketHeader_EncryptionMode.UNRECOGNIZED;
  }
}

export function packetHeader_EncryptionModeToJSON(object: PacketHeader_EncryptionMode): string {
  switch (object) {
    case PacketHeader_EncryptionMode.kEncryptionNone:
      return "kEncryptionNone";
    case PacketHeader_EncryptionMode.kEncryptionServiceToken:
      return "kEncryptionServiceToken";
    case PacketHeader_EncryptionMode.kEncryptionSessionKey:
      return "kEncryptionSessionKey";
    default:
      return "UNKNOWN";
  }
}

export enum PacketHeader_Feature {
  kReserve = 0,
  kCompressLz4 = 1,
  UNRECOGNIZED = -1,
}

export function packetHeader_FeatureFromJSON(object: any): PacketHeader_Feature {
  switch (object) {
    case 0:
    case "kReserve":
      return PacketHeader_Feature.kReserve;
    case 1:
    case "kCompressLz4":
      return PacketHeader_Feature.kCompressLz4;
    case -1:
    case "UNRECOGNIZED":
    default:
      return PacketHeader_Feature.UNRECOGNIZED;
  }
}

export function packetHeader_FeatureToJSON(object: PacketHeader_Feature): string {
  switch (object) {
    case PacketHeader_Feature.kReserve:
      return "kReserve";
    case PacketHeader_Feature.kCompressLz4:
      return "kCompressLz4";
    default:
      return "UNKNOWN";
  }
}

export const PacketHeader = {
  encode(message: PacketHeader, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.appId);
    writer.uint32(16).int64(message.uid);
    writer.uint32(24).int64(message.instanceId);
    writer.uint32(40).uint32(message.flags);
    writer.uint32(48).int32(message.encodingType);
    writer.uint32(56).uint32(message.decodedPayloadLen);
    writer.uint32(64).int32(message.encryptionMode);
    if (message.tokenInfo !== undefined && message.tokenInfo !== undefined) {
      TokenInfo.encode(message.tokenInfo, writer.uint32(74).fork()).ldelim();
    }
    writer.uint32(80).int64(message.seqId);
    writer.uint32(90).fork();
    for (const v of message.features) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(98).string(message.kpn);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PacketHeader {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePacketHeader } as PacketHeader;
    message.features = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.appId = reader.int32();
          break;
        case 2:
          message.uid = reader.int64() as Long;
          break;
        case 3:
          message.instanceId = reader.int64() as Long;
          break;
        case 5:
          message.flags = reader.uint32();
          break;
        case 6:
          message.encodingType = reader.int32() as any;
          break;
        case 7:
          message.decodedPayloadLen = reader.uint32();
          break;
        case 8:
          message.encryptionMode = reader.int32() as any;
          break;
        case 9:
          message.tokenInfo = TokenInfo.decode(reader, reader.uint32());
          break;
        case 10:
          message.seqId = reader.int64() as Long;
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.features.push(reader.int32() as any);
            }
          } else {
            message.features.push(reader.int32() as any);
          }
          break;
        case 12:
          message.kpn = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PacketHeader {
    const message = { ...basePacketHeader } as PacketHeader;
    message.features = [];
    if (object.appId !== undefined && object.appId !== null) {
      message.appId = Number(object.appId);
    } else {
      message.appId = 0;
    }
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = Long.fromString(object.uid);
    } else {
      message.uid = Long.ZERO;
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = Long.fromString(object.instanceId);
    } else {
      message.instanceId = Long.ZERO;
    }
    if (object.flags !== undefined && object.flags !== null) {
      message.flags = Number(object.flags);
    } else {
      message.flags = 0;
    }
    if (object.encodingType !== undefined && object.encodingType !== null) {
      message.encodingType = packetHeader_EncodingTypeFromJSON(object.encodingType);
    } else {
      message.encodingType = 0;
    }
    if (object.decodedPayloadLen !== undefined && object.decodedPayloadLen !== null) {
      message.decodedPayloadLen = Number(object.decodedPayloadLen);
    } else {
      message.decodedPayloadLen = 0;
    }
    if (object.encryptionMode !== undefined && object.encryptionMode !== null) {
      message.encryptionMode = packetHeader_EncryptionModeFromJSON(object.encryptionMode);
    } else {
      message.encryptionMode = 0;
    }
    if (object.tokenInfo !== undefined && object.tokenInfo !== null) {
      message.tokenInfo = TokenInfo.fromJSON(object.tokenInfo);
    } else {
      message.tokenInfo = undefined;
    }
    if (object.seqId !== undefined && object.seqId !== null) {
      message.seqId = Long.fromString(object.seqId);
    } else {
      message.seqId = Long.ZERO;
    }
    if (object.features !== undefined && object.features !== null) {
      for (const e of object.features) {
        message.features.push(packetHeader_FeatureFromJSON(e));
      }
    }
    if (object.kpn !== undefined && object.kpn !== null) {
      message.kpn = String(object.kpn);
    } else {
      message.kpn = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<PacketHeader>): PacketHeader {
    const message = { ...basePacketHeader } as PacketHeader;
    message.features = [];
    if (object.appId !== undefined && object.appId !== null) {
      message.appId = object.appId;
    } else {
      message.appId = 0;
    }
    if (object.uid !== undefined && object.uid !== null) {
      message.uid = object.uid as Long;
    } else {
      message.uid = Long.ZERO;
    }
    if (object.instanceId !== undefined && object.instanceId !== null) {
      message.instanceId = object.instanceId as Long;
    } else {
      message.instanceId = Long.ZERO;
    }
    if (object.flags !== undefined && object.flags !== null) {
      message.flags = object.flags;
    } else {
      message.flags = 0;
    }
    if (object.encodingType !== undefined && object.encodingType !== null) {
      message.encodingType = object.encodingType;
    } else {
      message.encodingType = 0;
    }
    if (object.decodedPayloadLen !== undefined && object.decodedPayloadLen !== null) {
      message.decodedPayloadLen = object.decodedPayloadLen;
    } else {
      message.decodedPayloadLen = 0;
    }
    if (object.encryptionMode !== undefined && object.encryptionMode !== null) {
      message.encryptionMode = object.encryptionMode;
    } else {
      message.encryptionMode = 0;
    }
    if (object.tokenInfo !== undefined && object.tokenInfo !== null) {
      message.tokenInfo = TokenInfo.fromPartial(object.tokenInfo);
    } else {
      message.tokenInfo = undefined;
    }
    if (object.seqId !== undefined && object.seqId !== null) {
      message.seqId = object.seqId as Long;
    } else {
      message.seqId = Long.ZERO;
    }
    if (object.features !== undefined && object.features !== null) {
      for (const e of object.features) {
        message.features.push(e);
      }
    }
    if (object.kpn !== undefined && object.kpn !== null) {
      message.kpn = object.kpn;
    } else {
      message.kpn = "";
    }
    return message;
  },
  toJSON(message: PacketHeader): unknown {
    const obj: any = {};
    message.appId !== undefined && (obj.appId = message.appId);
    message.uid !== undefined && (obj.uid = (message.uid || Long.ZERO).toString());
    message.instanceId !== undefined && (obj.instanceId = (message.instanceId || Long.ZERO).toString());
    message.flags !== undefined && (obj.flags = message.flags);
    message.encodingType !== undefined && (obj.encodingType = packetHeader_EncodingTypeToJSON(message.encodingType));
    message.decodedPayloadLen !== undefined && (obj.decodedPayloadLen = message.decodedPayloadLen);
    message.encryptionMode !== undefined && (obj.encryptionMode = packetHeader_EncryptionModeToJSON(message.encryptionMode));
    message.tokenInfo !== undefined && (obj.tokenInfo = message.tokenInfo ? TokenInfo.toJSON(message.tokenInfo) : undefined);
    message.seqId !== undefined && (obj.seqId = (message.seqId || Long.ZERO).toString());
    if (message.features) {
      obj.features = message.features.map(e => packetHeader_FeatureToJSON(e));
    } else {
      obj.features = [];
    }
    message.kpn !== undefined && (obj.kpn = message.kpn);
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