/* eslint-disable */
import { AccessPoint } from './AccessPoint';
import { Writer, Reader } from 'protobufjs/minimal';


export interface AccessPointsConfig {
  optimalAps: AccessPoint[];
  backupAps: AccessPoint[];
  availablePorts: number[];
  foreceLastConnectedAp: AccessPoint | undefined;
}

const baseAccessPointsConfig: object = {
  availablePorts: 0,
};

export const protobufPackage = 'AcFunDanmu'

export const AccessPointsConfig = {
  encode(message: AccessPointsConfig, writer: Writer = Writer.create()): Writer {
    for (const v of message.optimalAps) {
      AccessPoint.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.backupAps) {
      AccessPoint.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.availablePorts) {
      writer.uint32(v);
    }
    writer.ldelim();
    if (message.foreceLastConnectedAp !== undefined && message.foreceLastConnectedAp !== undefined) {
      AccessPoint.encode(message.foreceLastConnectedAp, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AccessPointsConfig {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAccessPointsConfig } as AccessPointsConfig;
    message.optimalAps = [];
    message.backupAps = [];
    message.availablePorts = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.optimalAps.push(AccessPoint.decode(reader, reader.uint32()));
          break;
        case 2:
          message.backupAps.push(AccessPoint.decode(reader, reader.uint32()));
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.availablePorts.push(reader.uint32());
            }
          } else {
            message.availablePorts.push(reader.uint32());
          }
          break;
        case 4:
          message.foreceLastConnectedAp = AccessPoint.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AccessPointsConfig {
    const message = { ...baseAccessPointsConfig } as AccessPointsConfig;
    message.optimalAps = [];
    message.backupAps = [];
    message.availablePorts = [];
    if (object.optimalAps !== undefined && object.optimalAps !== null) {
      for (const e of object.optimalAps) {
        message.optimalAps.push(AccessPoint.fromJSON(e));
      }
    }
    if (object.backupAps !== undefined && object.backupAps !== null) {
      for (const e of object.backupAps) {
        message.backupAps.push(AccessPoint.fromJSON(e));
      }
    }
    if (object.availablePorts !== undefined && object.availablePorts !== null) {
      for (const e of object.availablePorts) {
        message.availablePorts.push(Number(e));
      }
    }
    if (object.foreceLastConnectedAp !== undefined && object.foreceLastConnectedAp !== null) {
      message.foreceLastConnectedAp = AccessPoint.fromJSON(object.foreceLastConnectedAp);
    } else {
      message.foreceLastConnectedAp = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AccessPointsConfig>): AccessPointsConfig {
    const message = { ...baseAccessPointsConfig } as AccessPointsConfig;
    message.optimalAps = [];
    message.backupAps = [];
    message.availablePorts = [];
    if (object.optimalAps !== undefined && object.optimalAps !== null) {
      for (const e of object.optimalAps) {
        message.optimalAps.push(AccessPoint.fromPartial(e));
      }
    }
    if (object.backupAps !== undefined && object.backupAps !== null) {
      for (const e of object.backupAps) {
        message.backupAps.push(AccessPoint.fromPartial(e));
      }
    }
    if (object.availablePorts !== undefined && object.availablePorts !== null) {
      for (const e of object.availablePorts) {
        message.availablePorts.push(e);
      }
    }
    if (object.foreceLastConnectedAp !== undefined && object.foreceLastConnectedAp !== null) {
      message.foreceLastConnectedAp = AccessPoint.fromPartial(object.foreceLastConnectedAp);
    } else {
      message.foreceLastConnectedAp = undefined;
    }
    return message;
  },
  toJSON(message: AccessPointsConfig): unknown {
    const obj: any = {};
    if (message.optimalAps) {
      obj.optimalAps = message.optimalAps.map(e => e ? AccessPoint.toJSON(e) : undefined);
    } else {
      obj.optimalAps = [];
    }
    if (message.backupAps) {
      obj.backupAps = message.backupAps.map(e => e ? AccessPoint.toJSON(e) : undefined);
    } else {
      obj.backupAps = [];
    }
    if (message.availablePorts) {
      obj.availablePorts = message.availablePorts.map(e => e);
    } else {
      obj.availablePorts = [];
    }
    message.foreceLastConnectedAp !== undefined && (obj.foreceLastConnectedAp = message.foreceLastConnectedAp ? AccessPoint.toJSON(message.foreceLastConnectedAp) : undefined);
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