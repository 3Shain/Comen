/* eslint-disable */

export const protobufPackage = 'AcFunDanmu'

export enum CsAckErrorCode {
  SUCCESS_CS_ACK = 0,
  LIVE_CLOSED = 1,
  TICKET_ILLEGAL = 2,
  ATTACH_ILLEGAL = 3,
  USER_NOT_IN_ROOM = 4,
  SERVER_ERROR = 5,
  REQUEST_PARAM_INVALID = 6,
  ROOM_NOT_EXIST_IN_STATE_MANAGER = 7,
  NEW_LIVE_OPENED = 8,
  UNRECOGNIZED = -1,
}

export function csAckErrorCodeFromJSON(object: any): CsAckErrorCode {
  switch (object) {
    case 0:
    case "SUCCESS_CS_ACK":
      return CsAckErrorCode.SUCCESS_CS_ACK;
    case 1:
    case "LIVE_CLOSED":
      return CsAckErrorCode.LIVE_CLOSED;
    case 2:
    case "TICKET_ILLEGAL":
      return CsAckErrorCode.TICKET_ILLEGAL;
    case 3:
    case "ATTACH_ILLEGAL":
      return CsAckErrorCode.ATTACH_ILLEGAL;
    case 4:
    case "USER_NOT_IN_ROOM":
      return CsAckErrorCode.USER_NOT_IN_ROOM;
    case 5:
    case "SERVER_ERROR":
      return CsAckErrorCode.SERVER_ERROR;
    case 6:
    case "REQUEST_PARAM_INVALID":
      return CsAckErrorCode.REQUEST_PARAM_INVALID;
    case 7:
    case "ROOM_NOT_EXIST_IN_STATE_MANAGER":
      return CsAckErrorCode.ROOM_NOT_EXIST_IN_STATE_MANAGER;
    case 8:
    case "NEW_LIVE_OPENED":
      return CsAckErrorCode.NEW_LIVE_OPENED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CsAckErrorCode.UNRECOGNIZED;
  }
}

export function csAckErrorCodeToJSON(object: CsAckErrorCode): string {
  switch (object) {
    case CsAckErrorCode.SUCCESS_CS_ACK:
      return "SUCCESS_CS_ACK";
    case CsAckErrorCode.LIVE_CLOSED:
      return "LIVE_CLOSED";
    case CsAckErrorCode.TICKET_ILLEGAL:
      return "TICKET_ILLEGAL";
    case CsAckErrorCode.ATTACH_ILLEGAL:
      return "ATTACH_ILLEGAL";
    case CsAckErrorCode.USER_NOT_IN_ROOM:
      return "USER_NOT_IN_ROOM";
    case CsAckErrorCode.SERVER_ERROR:
      return "SERVER_ERROR";
    case CsAckErrorCode.REQUEST_PARAM_INVALID:
      return "REQUEST_PARAM_INVALID";
    case CsAckErrorCode.ROOM_NOT_EXIST_IN_STATE_MANAGER:
      return "ROOM_NOT_EXIST_IN_STATE_MANAGER";
    case CsAckErrorCode.NEW_LIVE_OPENED:
      return "NEW_LIVE_OPENED";
    default:
      return "UNKNOWN";
  }
}
