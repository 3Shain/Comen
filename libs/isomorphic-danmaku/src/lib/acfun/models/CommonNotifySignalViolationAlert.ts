/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonNotifySignalViolationAlert {
  violationContent: string;
}

const baseCommonNotifySignalViolationAlert: object = {
  violationContent: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonNotifySignalViolationAlert = {
  encode(message: CommonNotifySignalViolationAlert, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.violationContent);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonNotifySignalViolationAlert {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonNotifySignalViolationAlert } as CommonNotifySignalViolationAlert;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.violationContent = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonNotifySignalViolationAlert {
    const message = { ...baseCommonNotifySignalViolationAlert } as CommonNotifySignalViolationAlert;
    if (object.violationContent !== undefined && object.violationContent !== null) {
      message.violationContent = String(object.violationContent);
    } else {
      message.violationContent = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonNotifySignalViolationAlert>): CommonNotifySignalViolationAlert {
    const message = { ...baseCommonNotifySignalViolationAlert } as CommonNotifySignalViolationAlert;
    if (object.violationContent !== undefined && object.violationContent !== null) {
      message.violationContent = object.violationContent;
    } else {
      message.violationContent = "";
    }
    return message;
  },
  toJSON(message: CommonNotifySignalViolationAlert): unknown {
    const obj: any = {};
    message.violationContent !== undefined && (obj.violationContent = message.violationContent);
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