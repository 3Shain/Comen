/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum ZtLiveDownstreamPayloadErrorCode {
  SUCCESS_DOWNSTREAM_PAYLOAD = 0,
  CS_CMD_PARSE_ERROR = 100001,
  CS_CMD_CMD_NOT_SUPPORT = 100002,
  CS_CMD_TICKET_ILLEGAL = 100003,
  UNRECOGNIZED = -1,
}

export function ztLiveDownstreamPayloadErrorCodeFromJSON(object: any): ZtLiveDownstreamPayloadErrorCode {
  switch (object) {
    case 0:
    case "SUCCESS_DOWNSTREAM_PAYLOAD":
      return ZtLiveDownstreamPayloadErrorCode.SUCCESS_DOWNSTREAM_PAYLOAD;
    case 100001:
    case "CS_CMD_PARSE_ERROR":
      return ZtLiveDownstreamPayloadErrorCode.CS_CMD_PARSE_ERROR;
    case 100002:
    case "CS_CMD_CMD_NOT_SUPPORT":
      return ZtLiveDownstreamPayloadErrorCode.CS_CMD_CMD_NOT_SUPPORT;
    case 100003:
    case "CS_CMD_TICKET_ILLEGAL":
      return ZtLiveDownstreamPayloadErrorCode.CS_CMD_TICKET_ILLEGAL;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ZtLiveDownstreamPayloadErrorCode.UNRECOGNIZED;
  }
}

export function ztLiveDownstreamPayloadErrorCodeToJSON(object: ZtLiveDownstreamPayloadErrorCode): string {
  switch (object) {
    case ZtLiveDownstreamPayloadErrorCode.SUCCESS_DOWNSTREAM_PAYLOAD:
      return "SUCCESS_DOWNSTREAM_PAYLOAD";
    case ZtLiveDownstreamPayloadErrorCode.CS_CMD_PARSE_ERROR:
      return "CS_CMD_PARSE_ERROR";
    case ZtLiveDownstreamPayloadErrorCode.CS_CMD_CMD_NOT_SUPPORT:
      return "CS_CMD_CMD_NOT_SUPPORT";
    case ZtLiveDownstreamPayloadErrorCode.CS_CMD_TICKET_ILLEGAL:
      return "CS_CMD_TICKET_ILLEGAL";
    default:
      return "UNKNOWN";
  }
}
