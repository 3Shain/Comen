/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface LiveFeatureState {
  type: LiveFeatureState_FeatureType;
  state: LiveFeatureState_FeatureState;
}

const baseLiveFeatureState: object = {
  type: 0,
  state: 0,
};

export const protobufPackage = 'AcFunDanmu'

export enum LiveFeatureState_FeatureType {
  FEATURE_UNKNOWN = 0,
  LANDSCAPE_COMMENT = 1,
  UNRECOGNIZED = -1,
}

export function liveFeatureState_FeatureTypeFromJSON(object: any): LiveFeatureState_FeatureType {
  switch (object) {
    case 0:
    case "FEATURE_UNKNOWN":
      return LiveFeatureState_FeatureType.FEATURE_UNKNOWN;
    case 1:
    case "LANDSCAPE_COMMENT":
      return LiveFeatureState_FeatureType.LANDSCAPE_COMMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LiveFeatureState_FeatureType.UNRECOGNIZED;
  }
}

export function liveFeatureState_FeatureTypeToJSON(object: LiveFeatureState_FeatureType): string {
  switch (object) {
    case LiveFeatureState_FeatureType.FEATURE_UNKNOWN:
      return "FEATURE_UNKNOWN";
    case LiveFeatureState_FeatureType.LANDSCAPE_COMMENT:
      return "LANDSCAPE_COMMENT";
    default:
      return "UNKNOWN";
  }
}

export enum LiveFeatureState_FeatureState {
  FEATURE_STATE_UNKNOWN = 0,
  FEATURE_STATE_OPEND = 1,
  FEATURE_STATE_CLOSED = 2,
  UNRECOGNIZED = -1,
}

export function liveFeatureState_FeatureStateFromJSON(object: any): LiveFeatureState_FeatureState {
  switch (object) {
    case 0:
    case "FEATURE_STATE_UNKNOWN":
      return LiveFeatureState_FeatureState.FEATURE_STATE_UNKNOWN;
    case 1:
    case "FEATURE_STATE_OPEND":
      return LiveFeatureState_FeatureState.FEATURE_STATE_OPEND;
    case 2:
    case "FEATURE_STATE_CLOSED":
      return LiveFeatureState_FeatureState.FEATURE_STATE_CLOSED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LiveFeatureState_FeatureState.UNRECOGNIZED;
  }
}

export function liveFeatureState_FeatureStateToJSON(object: LiveFeatureState_FeatureState): string {
  switch (object) {
    case LiveFeatureState_FeatureState.FEATURE_STATE_UNKNOWN:
      return "FEATURE_STATE_UNKNOWN";
    case LiveFeatureState_FeatureState.FEATURE_STATE_OPEND:
      return "FEATURE_STATE_OPEND";
    case LiveFeatureState_FeatureState.FEATURE_STATE_CLOSED:
      return "FEATURE_STATE_CLOSED";
    default:
      return "UNKNOWN";
  }
}

export const LiveFeatureState = {
  encode(message: LiveFeatureState, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.type);
    writer.uint32(16).int32(message.state);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): LiveFeatureState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseLiveFeatureState } as LiveFeatureState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): LiveFeatureState {
    const message = { ...baseLiveFeatureState } as LiveFeatureState;
    if (object.type !== undefined && object.type !== null) {
      message.type = liveFeatureState_FeatureTypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = liveFeatureState_FeatureStateFromJSON(object.state);
    } else {
      message.state = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<LiveFeatureState>): LiveFeatureState {
    const message = { ...baseLiveFeatureState } as LiveFeatureState;
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    return message;
  },
  toJSON(message: LiveFeatureState): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = liveFeatureState_FeatureTypeToJSON(message.type));
    message.state !== undefined && (obj.state = liveFeatureState_FeatureStateToJSON(message.state));
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