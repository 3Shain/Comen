/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalAuthorChatChangeSoundConfig {
  authorChatId: string;
  soundConfigChangeType: CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType;
}

const baseCommonStateSignalAuthorChatChangeSoundConfig: object = {
  authorChatId: "",
  soundConfigChangeType: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType {
  UNKNOWN = 0,
  OPEN_SOUND = 1,
  CLOSE_SOUND = 2,
  UNRECOGNIZED = -1,
}

export function commonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeTypeFromJSON(object: any): CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.UNKNOWN;
    case 1:
    case "OPEN_SOUND":
      return CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.OPEN_SOUND;
    case 2:
    case "CLOSE_SOUND":
      return CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.CLOSE_SOUND;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.UNRECOGNIZED;
  }
}

export function commonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeTypeToJSON(object: CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType): string {
  switch (object) {
    case CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.UNKNOWN:
      return "UNKNOWN";
    case CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.OPEN_SOUND:
      return "OPEN_SOUND";
    case CommonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeType.CLOSE_SOUND:
      return "CLOSE_SOUND";
    default:
      return "UNKNOWN";
  }
}

export const CommonStateSignalAuthorChatChangeSoundConfig = {
  encode(message: CommonStateSignalAuthorChatChangeSoundConfig, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.authorChatId);
    writer.uint32(16).int32(message.soundConfigChangeType);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalAuthorChatChangeSoundConfig {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalAuthorChatChangeSoundConfig } as CommonStateSignalAuthorChatChangeSoundConfig;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorChatId = reader.string();
          break;
        case 2:
          message.soundConfigChangeType = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalAuthorChatChangeSoundConfig {
    const message = { ...baseCommonStateSignalAuthorChatChangeSoundConfig } as CommonStateSignalAuthorChatChangeSoundConfig;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = String(object.authorChatId);
    } else {
      message.authorChatId = "";
    }
    if (object.soundConfigChangeType !== undefined && object.soundConfigChangeType !== null) {
      message.soundConfigChangeType = commonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeTypeFromJSON(object.soundConfigChangeType);
    } else {
      message.soundConfigChangeType = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalAuthorChatChangeSoundConfig>): CommonStateSignalAuthorChatChangeSoundConfig {
    const message = { ...baseCommonStateSignalAuthorChatChangeSoundConfig } as CommonStateSignalAuthorChatChangeSoundConfig;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = object.authorChatId;
    } else {
      message.authorChatId = "";
    }
    if (object.soundConfigChangeType !== undefined && object.soundConfigChangeType !== null) {
      message.soundConfigChangeType = object.soundConfigChangeType;
    } else {
      message.soundConfigChangeType = 0;
    }
    return message;
  },
  toJSON(message: CommonStateSignalAuthorChatChangeSoundConfig): unknown {
    const obj: any = {};
    message.authorChatId !== undefined && (obj.authorChatId = message.authorChatId);
    message.soundConfigChangeType !== undefined && (obj.soundConfigChangeType = commonStateSignalAuthorChatChangeSoundConfig_SoundConfigChangeTypeToJSON(message.soundConfigChangeType));
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