/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum ChatMediaType {
  UNKNOWN = 0,
  AUDIO = 1,
  VIDEO = 2,
  UNRECOGNIZED = -1,
}

export function chatMediaTypeFromJSON(object: any): ChatMediaType {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return ChatMediaType.UNKNOWN;
    case 1:
    case "AUDIO":
      return ChatMediaType.AUDIO;
    case 2:
    case "VIDEO":
      return ChatMediaType.VIDEO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChatMediaType.UNRECOGNIZED;
  }
}

export function chatMediaTypeToJSON(object: ChatMediaType): string {
  switch (object) {
    case ChatMediaType.UNKNOWN:
      return "UNKNOWN";
    case ChatMediaType.AUDIO:
      return "AUDIO";
    case ChatMediaType.VIDEO:
      return "VIDEO";
    default:
      return "UNKNOWN";
  }
}
