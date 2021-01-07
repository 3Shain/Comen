/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum ZtLivePkProto {
  d = 0,
  e = 1,
  f = 2,
  g = 3,
  UNRECOGNIZED = -1,
}

export function ztLivePkProtoFromJSON(object: any): ZtLivePkProto {
  switch (object) {
    case 0:
    case "d":
      return ZtLivePkProto.d;
    case 1:
    case "e":
      return ZtLivePkProto.e;
    case 2:
    case "f":
      return ZtLivePkProto.f;
    case 3:
    case "g":
      return ZtLivePkProto.g;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZtLivePkProto.UNRECOGNIZED;
  }
}

export function ztLivePkProtoToJSON(object: ZtLivePkProto): string {
  switch (object) {
    case ZtLivePkProto.d:
      return "d";
    case ZtLivePkProto.e:
      return "e";
    case ZtLivePkProto.f:
      return "f";
    case ZtLivePkProto.g:
      return "g";
    default:
      return "UNKNOWN";
  }
}
