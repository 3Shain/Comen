/* eslint-disable */
import { RegisterRequest_PresenceStatus, RegisterRequest_ActiveStatus, registerRequest_PresenceStatusFromJSON, registerRequest_ActiveStatusFromJSON, registerRequest_PresenceStatusToJSON, registerRequest_ActiveStatusToJSON } from './Register';
import { PushServiceToken } from './PushServiceToken';
import { AccessPointsConfig } from './AccessPointsConfig';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface KeepAliveRequest {
  presenceStatus: RegisterRequest_PresenceStatus;
  appActiveStatus: RegisterRequest_ActiveStatus;
  pushServiceToken: PushServiceToken | undefined;
  pushServiceTokenList: PushServiceToken[];
  keepaliveIntervalSec: number;
}

export interface KeepAliveResponse {
  accessPointsConfig: AccessPointsConfig | undefined;
  serverMsec: Long;
  accessPointsConfigIpv6: AccessPointsConfig | undefined;
}

const baseKeepAliveRequest: object = {
  presenceStatus: 0,
  appActiveStatus: 0,
  keepaliveIntervalSec: 0,
};

const baseKeepAliveResponse: object = {
  serverMsec: Long.ZERO,
};

export const protobufPackage = 'AcFunDanmu'

export const KeepAliveRequest = {
  encode(message: KeepAliveRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.presenceStatus);
    writer.uint32(16).int32(message.appActiveStatus);
    if (message.pushServiceToken !== undefined && message.pushServiceToken !== undefined) {
      PushServiceToken.encode(message.pushServiceToken, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.pushServiceTokenList) {
      PushServiceToken.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(40).int32(message.keepaliveIntervalSec);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): KeepAliveRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKeepAliveRequest } as KeepAliveRequest;
    message.pushServiceTokenList = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.presenceStatus = reader.int32() as any;
          break;
        case 2:
          message.appActiveStatus = reader.int32() as any;
          break;
        case 3:
          message.pushServiceToken = PushServiceToken.decode(reader, reader.uint32());
          break;
        case 4:
          message.pushServiceTokenList.push(PushServiceToken.decode(reader, reader.uint32()));
          break;
        case 5:
          message.keepaliveIntervalSec = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): KeepAliveRequest {
    const message = { ...baseKeepAliveRequest } as KeepAliveRequest;
    message.pushServiceTokenList = [];
    if (object.presenceStatus !== undefined && object.presenceStatus !== null) {
      message.presenceStatus = registerRequest_PresenceStatusFromJSON(object.presenceStatus);
    } else {
      message.presenceStatus = 0;
    }
    if (object.appActiveStatus !== undefined && object.appActiveStatus !== null) {
      message.appActiveStatus = registerRequest_ActiveStatusFromJSON(object.appActiveStatus);
    } else {
      message.appActiveStatus = 0;
    }
    if (object.pushServiceToken !== undefined && object.pushServiceToken !== null) {
      message.pushServiceToken = PushServiceToken.fromJSON(object.pushServiceToken);
    } else {
      message.pushServiceToken = undefined;
    }
    if (object.pushServiceTokenList !== undefined && object.pushServiceTokenList !== null) {
      for (const e of object.pushServiceTokenList) {
        message.pushServiceTokenList.push(PushServiceToken.fromJSON(e));
      }
    }
    if (object.keepaliveIntervalSec !== undefined && object.keepaliveIntervalSec !== null) {
      message.keepaliveIntervalSec = Number(object.keepaliveIntervalSec);
    } else {
      message.keepaliveIntervalSec = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<KeepAliveRequest>): KeepAliveRequest {
    const message = { ...baseKeepAliveRequest } as KeepAliveRequest;
    message.pushServiceTokenList = [];
    if (object.presenceStatus !== undefined && object.presenceStatus !== null) {
      message.presenceStatus = object.presenceStatus;
    } else {
      message.presenceStatus = 0;
    }
    if (object.appActiveStatus !== undefined && object.appActiveStatus !== null) {
      message.appActiveStatus = object.appActiveStatus;
    } else {
      message.appActiveStatus = 0;
    }
    if (object.pushServiceToken !== undefined && object.pushServiceToken !== null) {
      message.pushServiceToken = PushServiceToken.fromPartial(object.pushServiceToken);
    } else {
      message.pushServiceToken = undefined;
    }
    if (object.pushServiceTokenList !== undefined && object.pushServiceTokenList !== null) {
      for (const e of object.pushServiceTokenList) {
        message.pushServiceTokenList.push(PushServiceToken.fromPartial(e));
      }
    }
    if (object.keepaliveIntervalSec !== undefined && object.keepaliveIntervalSec !== null) {
      message.keepaliveIntervalSec = object.keepaliveIntervalSec;
    } else {
      message.keepaliveIntervalSec = 0;
    }
    return message;
  },
  toJSON(message: KeepAliveRequest): unknown {
    const obj: any = {};
    message.presenceStatus !== undefined && (obj.presenceStatus = registerRequest_PresenceStatusToJSON(message.presenceStatus));
    message.appActiveStatus !== undefined && (obj.appActiveStatus = registerRequest_ActiveStatusToJSON(message.appActiveStatus));
    message.pushServiceToken !== undefined && (obj.pushServiceToken = message.pushServiceToken ? PushServiceToken.toJSON(message.pushServiceToken) : undefined);
    if (message.pushServiceTokenList) {
      obj.pushServiceTokenList = message.pushServiceTokenList.map(e => e ? PushServiceToken.toJSON(e) : undefined);
    } else {
      obj.pushServiceTokenList = [];
    }
    message.keepaliveIntervalSec !== undefined && (obj.keepaliveIntervalSec = message.keepaliveIntervalSec);
    return obj;
  },
};

export const KeepAliveResponse = {
  encode(message: KeepAliveResponse, writer: Writer = Writer.create()): Writer {
    if (message.accessPointsConfig !== undefined && message.accessPointsConfig !== undefined) {
      AccessPointsConfig.encode(message.accessPointsConfig, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.serverMsec);
    if (message.accessPointsConfigIpv6 !== undefined && message.accessPointsConfigIpv6 !== undefined) {
      AccessPointsConfig.encode(message.accessPointsConfigIpv6, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): KeepAliveResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseKeepAliveResponse } as KeepAliveResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accessPointsConfig = AccessPointsConfig.decode(reader, reader.uint32());
          break;
        case 2:
          message.serverMsec = reader.int64() as Long;
          break;
        case 3:
          message.accessPointsConfigIpv6 = AccessPointsConfig.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): KeepAliveResponse {
    const message = { ...baseKeepAliveResponse } as KeepAliveResponse;
    if (object.accessPointsConfig !== undefined && object.accessPointsConfig !== null) {
      message.accessPointsConfig = AccessPointsConfig.fromJSON(object.accessPointsConfig);
    } else {
      message.accessPointsConfig = undefined;
    }
    if (object.serverMsec !== undefined && object.serverMsec !== null) {
      message.serverMsec = Long.fromString(object.serverMsec);
    } else {
      message.serverMsec = Long.ZERO;
    }
    if (object.accessPointsConfigIpv6 !== undefined && object.accessPointsConfigIpv6 !== null) {
      message.accessPointsConfigIpv6 = AccessPointsConfig.fromJSON(object.accessPointsConfigIpv6);
    } else {
      message.accessPointsConfigIpv6 = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<KeepAliveResponse>): KeepAliveResponse {
    const message = { ...baseKeepAliveResponse } as KeepAliveResponse;
    if (object.accessPointsConfig !== undefined && object.accessPointsConfig !== null) {
      message.accessPointsConfig = AccessPointsConfig.fromPartial(object.accessPointsConfig);
    } else {
      message.accessPointsConfig = undefined;
    }
    if (object.serverMsec !== undefined && object.serverMsec !== null) {
      message.serverMsec = object.serverMsec as Long;
    } else {
      message.serverMsec = Long.ZERO;
    }
    if (object.accessPointsConfigIpv6 !== undefined && object.accessPointsConfigIpv6 !== null) {
      message.accessPointsConfigIpv6 = AccessPointsConfig.fromPartial(object.accessPointsConfigIpv6);
    } else {
      message.accessPointsConfigIpv6 = undefined;
    }
    return message;
  },
  toJSON(message: KeepAliveResponse): unknown {
    const obj: any = {};
    message.accessPointsConfig !== undefined && (obj.accessPointsConfig = message.accessPointsConfig ? AccessPointsConfig.toJSON(message.accessPointsConfig) : undefined);
    message.serverMsec !== undefined && (obj.serverMsec = (message.serverMsec || Long.ZERO).toString());
    message.accessPointsConfigIpv6 !== undefined && (obj.accessPointsConfigIpv6 = message.accessPointsConfigIpv6 ? AccessPointsConfig.toJSON(message.accessPointsConfigIpv6) : undefined);
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