/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum SharePlatform {
  kSharePlatformInvalid = 0,
  kSharePlatformWechat = 1,
  kSharePlatformWechatMoments = 2,
  kSharePlatformQQ = 3,
  kSharePlatformQzone = 4,
  kSharePlatformWeibo = 5,
  kSharePlatformKuaishou = 6,
  kSharePlatformFacebook = 7,
  kSharePlatformTwitter = 8,
  kSharePlatformGoogle = 9,
  kSharePlatformKakao = 10,
  kSharePlatformZalo = 11,
  UNRECOGNIZED = -1,
}

export function sharePlatformFromJSON(object: any): SharePlatform {
  switch (object) {
    case 0:
    case "kSharePlatformInvalid":
      return SharePlatform.kSharePlatformInvalid;
    case 1:
    case "kSharePlatformWechat":
      return SharePlatform.kSharePlatformWechat;
    case 2:
    case "kSharePlatformWechatMoments":
      return SharePlatform.kSharePlatformWechatMoments;
    case 3:
    case "kSharePlatformQQ":
      return SharePlatform.kSharePlatformQQ;
    case 4:
    case "kSharePlatformQzone":
      return SharePlatform.kSharePlatformQzone;
    case 5:
    case "kSharePlatformWeibo":
      return SharePlatform.kSharePlatformWeibo;
    case 6:
    case "kSharePlatformKuaishou":
      return SharePlatform.kSharePlatformKuaishou;
    case 7:
    case "kSharePlatformFacebook":
      return SharePlatform.kSharePlatformFacebook;
    case 8:
    case "kSharePlatformTwitter":
      return SharePlatform.kSharePlatformTwitter;
    case 9:
    case "kSharePlatformGoogle":
      return SharePlatform.kSharePlatformGoogle;
    case 10:
    case "kSharePlatformKakao":
      return SharePlatform.kSharePlatformKakao;
    case 11:
    case "kSharePlatformZalo":
      return SharePlatform.kSharePlatformZalo;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SharePlatform.UNRECOGNIZED;
  }
}

export function sharePlatformToJSON(object: SharePlatform): string {
  switch (object) {
    case SharePlatform.kSharePlatformInvalid:
      return "kSharePlatformInvalid";
    case SharePlatform.kSharePlatformWechat:
      return "kSharePlatformWechat";
    case SharePlatform.kSharePlatformWechatMoments:
      return "kSharePlatformWechatMoments";
    case SharePlatform.kSharePlatformQQ:
      return "kSharePlatformQQ";
    case SharePlatform.kSharePlatformQzone:
      return "kSharePlatformQzone";
    case SharePlatform.kSharePlatformWeibo:
      return "kSharePlatformWeibo";
    case SharePlatform.kSharePlatformKuaishou:
      return "kSharePlatformKuaishou";
    case SharePlatform.kSharePlatformFacebook:
      return "kSharePlatformFacebook";
    case SharePlatform.kSharePlatformTwitter:
      return "kSharePlatformTwitter";
    case SharePlatform.kSharePlatformGoogle:
      return "kSharePlatformGoogle";
    case SharePlatform.kSharePlatformKakao:
      return "kSharePlatformKakao";
    case SharePlatform.kSharePlatformZalo:
      return "kSharePlatformZalo";
    default:
      return "UNKNOWN";
  }
}
