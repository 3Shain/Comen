/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum ZtLiveChatProto {
  a = 0,
  b = 1,
  c = 2,
  UNRECOGNIZED = -1,
}

export function ztLiveChatProtoFromJSON(object: any): ZtLiveChatProto {
  switch (object) {
    case 0:
    case "a":
      return ZtLiveChatProto.a;
    case 1:
    case "b":
      return ZtLiveChatProto.b;
    case 2:
    case "c":
      return ZtLiveChatProto.c;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZtLiveChatProto.UNRECOGNIZED;
  }
}

export function ztLiveChatProtoToJSON(object: ZtLiveChatProto): string {
  switch (object) {
    case ZtLiveChatProto.a:
      return "a";
    case ZtLiveChatProto.b:
      return "b";
    case ZtLiveChatProto.c:
      return "c";
    default:
      return "UNKNOWN";
  }
}
