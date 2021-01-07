/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonNotifySignalCoverAuditResult {
  auditStatus: CommonNotifySignalCoverAuditResult_AuditStatus;
}

const baseCommonNotifySignalCoverAuditResult: object = {
  auditStatus: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum CommonNotifySignalCoverAuditResult_AuditStatus {
  SUCCESS = 0,
  COVER_AUDIT_FAILED = 1,
  CAPTION_AUDIT_FAILED = 2,
  BOTH_FAILED = 3,
  UNRECOGNIZED = -1,
}

export function commonNotifySignalCoverAuditResult_AuditStatusFromJSON(object: any): CommonNotifySignalCoverAuditResult_AuditStatus {
  switch (object) {
    case 0:
    case "SUCCESS":
      return CommonNotifySignalCoverAuditResult_AuditStatus.SUCCESS;
    case 1:
    case "COVER_AUDIT_FAILED":
      return CommonNotifySignalCoverAuditResult_AuditStatus.COVER_AUDIT_FAILED;
    case 2:
    case "CAPTION_AUDIT_FAILED":
      return CommonNotifySignalCoverAuditResult_AuditStatus.CAPTION_AUDIT_FAILED;
    case 3:
    case "BOTH_FAILED":
      return CommonNotifySignalCoverAuditResult_AuditStatus.BOTH_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CommonNotifySignalCoverAuditResult_AuditStatus.UNRECOGNIZED;
  }
}

export function commonNotifySignalCoverAuditResult_AuditStatusToJSON(object: CommonNotifySignalCoverAuditResult_AuditStatus): string {
  switch (object) {
    case CommonNotifySignalCoverAuditResult_AuditStatus.SUCCESS:
      return "SUCCESS";
    case CommonNotifySignalCoverAuditResult_AuditStatus.COVER_AUDIT_FAILED:
      return "COVER_AUDIT_FAILED";
    case CommonNotifySignalCoverAuditResult_AuditStatus.CAPTION_AUDIT_FAILED:
      return "CAPTION_AUDIT_FAILED";
    case CommonNotifySignalCoverAuditResult_AuditStatus.BOTH_FAILED:
      return "BOTH_FAILED";
    default:
      return "UNKNOWN";
  }
}

export const CommonNotifySignalCoverAuditResult = {
  encode(message: CommonNotifySignalCoverAuditResult, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.auditStatus);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonNotifySignalCoverAuditResult {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonNotifySignalCoverAuditResult } as CommonNotifySignalCoverAuditResult;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auditStatus = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonNotifySignalCoverAuditResult {
    const message = { ...baseCommonNotifySignalCoverAuditResult } as CommonNotifySignalCoverAuditResult;
    if (object.auditStatus !== undefined && object.auditStatus !== null) {
      message.auditStatus = commonNotifySignalCoverAuditResult_AuditStatusFromJSON(object.auditStatus);
    } else {
      message.auditStatus = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonNotifySignalCoverAuditResult>): CommonNotifySignalCoverAuditResult {
    const message = { ...baseCommonNotifySignalCoverAuditResult } as CommonNotifySignalCoverAuditResult;
    if (object.auditStatus !== undefined && object.auditStatus !== null) {
      message.auditStatus = object.auditStatus;
    } else {
      message.auditStatus = 0;
    }
    return message;
  },
  toJSON(message: CommonNotifySignalCoverAuditResult): unknown {
    const obj: any = {};
    message.auditStatus !== undefined && (obj.auditStatus = commonNotifySignalCoverAuditResult_AuditStatusToJSON(message.auditStatus));
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