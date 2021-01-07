/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum LinkErrorCode {
  SUCC = 0,
  BASIC_MIN = 10000,
  INTERNEL_ERROR = 10001,
  SERVICE_UNAVAILABLE = 10002,
  SERVICE_TIMEOUT = 10003,
  INVALID_TOKEN = 10004,
  REG_ENCYRPT_WITHOUT_TOKEN = 10005,
  PARSE_PB_HDR_FAIL = 10006,
  PARSE_PB_PLD_FAIL = 10007,
  PARSE_PB_FAIL = 10008,
  DECODED_LEN_FAIL = 10009,
  INVALID_KEY = 10010,
  ENCRYPT_FAIL = 10011,
  DECRYPT_FAIL = 10012,
  INVALID_TAG = 10013,
  INVALID_VER = 10014,
  INVALID_COMPRESS_TYPE = 10016,
  INVALID_ENCRYPT_TYPE = 10017,
  NOT_REGISTER = 10018,
  USER_NOT_ONLINE = 10019,
  INVALID_COMMAND = 10020,
  PUSH_UNREGISTER_ERROR = 10021,
  INVALID_SID = 10022,
  INVALID_INSTANCE_ID = 10023,
  CLIENT_LOCALE_NOT_MATCH = 10024,
  INVALID_TOKEN_PASSWORD_CHANGED = 10025,
  INVALID_TOKEN_TOKEN_EXPIRED = 10026,
  INVALID_TOKEN_TOKEN_VALUE_ERROR = 10027,
  INVALID_TOKEN_LOGIN_ON_OTHER_DEVICE = 10028,
  FORCE_RECONNECT = 10029,
  CLIENT_TIMEOUT = 10030,
  INVALID_ARGUMENT = 10031,
  INVALID_FORMAT_TOKEN = 10032,
  EMPTY_PAYLOAD = 10033,
  COMPRESS_FAIL = 10034,
  DECOMPRESS_FAIL = 10035,
  OUT_OF_ORDER = 10036,
  BASIC_MAX = 19999,
  UNRECOGNIZED = -1,
}

export function linkErrorCodeFromJSON(object: any): LinkErrorCode {
  switch (object) {
    case 0:
    case "SUCC":
      return LinkErrorCode.SUCC;
    case 10000:
    case "BASIC_MIN":
      return LinkErrorCode.BASIC_MIN;
    case 10001:
    case "INTERNEL_ERROR":
      return LinkErrorCode.INTERNEL_ERROR;
    case 10002:
    case "SERVICE_UNAVAILABLE":
      return LinkErrorCode.SERVICE_UNAVAILABLE;
    case 10003:
    case "SERVICE_TIMEOUT":
      return LinkErrorCode.SERVICE_TIMEOUT;
    case 10004:
    case "INVALID_TOKEN":
      return LinkErrorCode.INVALID_TOKEN;
    case 10005:
    case "REG_ENCYRPT_WITHOUT_TOKEN":
      return LinkErrorCode.REG_ENCYRPT_WITHOUT_TOKEN;
    case 10006:
    case "PARSE_PB_HDR_FAIL":
      return LinkErrorCode.PARSE_PB_HDR_FAIL;
    case 10007:
    case "PARSE_PB_PLD_FAIL":
      return LinkErrorCode.PARSE_PB_PLD_FAIL;
    case 10008:
    case "PARSE_PB_FAIL":
      return LinkErrorCode.PARSE_PB_FAIL;
    case 10009:
    case "DECODED_LEN_FAIL":
      return LinkErrorCode.DECODED_LEN_FAIL;
    case 10010:
    case "INVALID_KEY":
      return LinkErrorCode.INVALID_KEY;
    case 10011:
    case "ENCRYPT_FAIL":
      return LinkErrorCode.ENCRYPT_FAIL;
    case 10012:
    case "DECRYPT_FAIL":
      return LinkErrorCode.DECRYPT_FAIL;
    case 10013:
    case "INVALID_TAG":
      return LinkErrorCode.INVALID_TAG;
    case 10014:
    case "INVALID_VER":
      return LinkErrorCode.INVALID_VER;
    case 10016:
    case "INVALID_COMPRESS_TYPE":
      return LinkErrorCode.INVALID_COMPRESS_TYPE;
    case 10017:
    case "INVALID_ENCRYPT_TYPE":
      return LinkErrorCode.INVALID_ENCRYPT_TYPE;
    case 10018:
    case "NOT_REGISTER":
      return LinkErrorCode.NOT_REGISTER;
    case 10019:
    case "USER_NOT_ONLINE":
      return LinkErrorCode.USER_NOT_ONLINE;
    case 10020:
    case "INVALID_COMMAND":
      return LinkErrorCode.INVALID_COMMAND;
    case 10021:
    case "PUSH_UNREGISTER_ERROR":
      return LinkErrorCode.PUSH_UNREGISTER_ERROR;
    case 10022:
    case "INVALID_SID":
      return LinkErrorCode.INVALID_SID;
    case 10023:
    case "INVALID_INSTANCE_ID":
      return LinkErrorCode.INVALID_INSTANCE_ID;
    case 10024:
    case "CLIENT_LOCALE_NOT_MATCH":
      return LinkErrorCode.CLIENT_LOCALE_NOT_MATCH;
    case 10025:
    case "INVALID_TOKEN_PASSWORD_CHANGED":
      return LinkErrorCode.INVALID_TOKEN_PASSWORD_CHANGED;
    case 10026:
    case "INVALID_TOKEN_TOKEN_EXPIRED":
      return LinkErrorCode.INVALID_TOKEN_TOKEN_EXPIRED;
    case 10027:
    case "INVALID_TOKEN_TOKEN_VALUE_ERROR":
      return LinkErrorCode.INVALID_TOKEN_TOKEN_VALUE_ERROR;
    case 10028:
    case "INVALID_TOKEN_LOGIN_ON_OTHER_DEVICE":
      return LinkErrorCode.INVALID_TOKEN_LOGIN_ON_OTHER_DEVICE;
    case 10029:
    case "FORCE_RECONNECT":
      return LinkErrorCode.FORCE_RECONNECT;
    case 10030:
    case "CLIENT_TIMEOUT":
      return LinkErrorCode.CLIENT_TIMEOUT;
    case 10031:
    case "INVALID_ARGUMENT":
      return LinkErrorCode.INVALID_ARGUMENT;
    case 10032:
    case "INVALID_FORMAT_TOKEN":
      return LinkErrorCode.INVALID_FORMAT_TOKEN;
    case 10033:
    case "EMPTY_PAYLOAD":
      return LinkErrorCode.EMPTY_PAYLOAD;
    case 10034:
    case "COMPRESS_FAIL":
      return LinkErrorCode.COMPRESS_FAIL;
    case 10035:
    case "DECOMPRESS_FAIL":
      return LinkErrorCode.DECOMPRESS_FAIL;
    case 10036:
    case "OUT_OF_ORDER":
      return LinkErrorCode.OUT_OF_ORDER;
    case 19999:
    case "BASIC_MAX":
      return LinkErrorCode.BASIC_MAX;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LinkErrorCode.UNRECOGNIZED;
  }
}

export function linkErrorCodeToJSON(object: LinkErrorCode): string {
  switch (object) {
    case LinkErrorCode.SUCC:
      return "SUCC";
    case LinkErrorCode.BASIC_MIN:
      return "BASIC_MIN";
    case LinkErrorCode.INTERNEL_ERROR:
      return "INTERNEL_ERROR";
    case LinkErrorCode.SERVICE_UNAVAILABLE:
      return "SERVICE_UNAVAILABLE";
    case LinkErrorCode.SERVICE_TIMEOUT:
      return "SERVICE_TIMEOUT";
    case LinkErrorCode.INVALID_TOKEN:
      return "INVALID_TOKEN";
    case LinkErrorCode.REG_ENCYRPT_WITHOUT_TOKEN:
      return "REG_ENCYRPT_WITHOUT_TOKEN";
    case LinkErrorCode.PARSE_PB_HDR_FAIL:
      return "PARSE_PB_HDR_FAIL";
    case LinkErrorCode.PARSE_PB_PLD_FAIL:
      return "PARSE_PB_PLD_FAIL";
    case LinkErrorCode.PARSE_PB_FAIL:
      return "PARSE_PB_FAIL";
    case LinkErrorCode.DECODED_LEN_FAIL:
      return "DECODED_LEN_FAIL";
    case LinkErrorCode.INVALID_KEY:
      return "INVALID_KEY";
    case LinkErrorCode.ENCRYPT_FAIL:
      return "ENCRYPT_FAIL";
    case LinkErrorCode.DECRYPT_FAIL:
      return "DECRYPT_FAIL";
    case LinkErrorCode.INVALID_TAG:
      return "INVALID_TAG";
    case LinkErrorCode.INVALID_VER:
      return "INVALID_VER";
    case LinkErrorCode.INVALID_COMPRESS_TYPE:
      return "INVALID_COMPRESS_TYPE";
    case LinkErrorCode.INVALID_ENCRYPT_TYPE:
      return "INVALID_ENCRYPT_TYPE";
    case LinkErrorCode.NOT_REGISTER:
      return "NOT_REGISTER";
    case LinkErrorCode.USER_NOT_ONLINE:
      return "USER_NOT_ONLINE";
    case LinkErrorCode.INVALID_COMMAND:
      return "INVALID_COMMAND";
    case LinkErrorCode.PUSH_UNREGISTER_ERROR:
      return "PUSH_UNREGISTER_ERROR";
    case LinkErrorCode.INVALID_SID:
      return "INVALID_SID";
    case LinkErrorCode.INVALID_INSTANCE_ID:
      return "INVALID_INSTANCE_ID";
    case LinkErrorCode.CLIENT_LOCALE_NOT_MATCH:
      return "CLIENT_LOCALE_NOT_MATCH";
    case LinkErrorCode.INVALID_TOKEN_PASSWORD_CHANGED:
      return "INVALID_TOKEN_PASSWORD_CHANGED";
    case LinkErrorCode.INVALID_TOKEN_TOKEN_EXPIRED:
      return "INVALID_TOKEN_TOKEN_EXPIRED";
    case LinkErrorCode.INVALID_TOKEN_TOKEN_VALUE_ERROR:
      return "INVALID_TOKEN_TOKEN_VALUE_ERROR";
    case LinkErrorCode.INVALID_TOKEN_LOGIN_ON_OTHER_DEVICE:
      return "INVALID_TOKEN_LOGIN_ON_OTHER_DEVICE";
    case LinkErrorCode.FORCE_RECONNECT:
      return "FORCE_RECONNECT";
    case LinkErrorCode.CLIENT_TIMEOUT:
      return "CLIENT_TIMEOUT";
    case LinkErrorCode.INVALID_ARGUMENT:
      return "INVALID_ARGUMENT";
    case LinkErrorCode.INVALID_FORMAT_TOKEN:
      return "INVALID_FORMAT_TOKEN";
    case LinkErrorCode.EMPTY_PAYLOAD:
      return "EMPTY_PAYLOAD";
    case LinkErrorCode.COMPRESS_FAIL:
      return "COMPRESS_FAIL";
    case LinkErrorCode.DECOMPRESS_FAIL:
      return "DECOMPRESS_FAIL";
    case LinkErrorCode.OUT_OF_ORDER:
      return "OUT_OF_ORDER";
    case LinkErrorCode.BASIC_MAX:
      return "BASIC_MAX";
    default:
      return "UNKNOWN";
  }
}
