/* eslint-disable */
import * as Long from 'long';
import { ImageCdnNode } from './ImageCdnNode';
import { ZtLiveUserInfo } from './ZtLiveUserInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonActionSignalRichText {
  /**
   * segment
   */
  segments: CommonActionSignalRichText_RichTextSegment[];
  sendTimeMs: Long;
}

export interface CommonActionSignalRichText_ImageSegment {
  /**
   * cdnNode
   */
  pictures: ImageCdnNode[];
  alternativeText: string;
  alternativeColor: string;
}

export interface CommonActionSignalRichText_PlainSegment {
  text: string;
  color: string;
}

export interface CommonActionSignalRichText_RichTextSegment {
  userInfo: CommonActionSignalRichText_UserInfoSegment | undefined;
  plain: CommonActionSignalRichText_PlainSegment | undefined;
  image: CommonActionSignalRichText_ImageSegment | undefined;
}

export interface CommonActionSignalRichText_UserInfoSegment {
  user: ZtLiveUserInfo | undefined;
  color: string;
}

const baseCommonActionSignalRichText: object = {
  sendTimeMs: Long.ZERO,
};

const baseCommonActionSignalRichText_ImageSegment: object = {
  alternativeText: "",
  alternativeColor: "",
};

const baseCommonActionSignalRichText_PlainSegment: object = {
  text: "",
  color: "",
};

const baseCommonActionSignalRichText_RichTextSegment: object = {
};

const baseCommonActionSignalRichText_UserInfoSegment: object = {
  color: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonActionSignalRichText = {
  encode(message: CommonActionSignalRichText, writer: Writer = Writer.create()): Writer {
    for (const v of message.segments) {
      CommonActionSignalRichText_RichTextSegment.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(16).int64(message.sendTimeMs);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalRichText {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalRichText } as CommonActionSignalRichText;
    message.segments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.segments.push(CommonActionSignalRichText_RichTextSegment.decode(reader, reader.uint32()));
          break;
        case 2:
          message.sendTimeMs = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalRichText {
    const message = { ...baseCommonActionSignalRichText } as CommonActionSignalRichText;
    message.segments = [];
    if (object.segments !== undefined && object.segments !== null) {
      for (const e of object.segments) {
        message.segments.push(CommonActionSignalRichText_RichTextSegment.fromJSON(e));
      }
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = Long.fromString(object.sendTimeMs);
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalRichText>): CommonActionSignalRichText {
    const message = { ...baseCommonActionSignalRichText } as CommonActionSignalRichText;
    message.segments = [];
    if (object.segments !== undefined && object.segments !== null) {
      for (const e of object.segments) {
        message.segments.push(CommonActionSignalRichText_RichTextSegment.fromPartial(e));
      }
    }
    if (object.sendTimeMs !== undefined && object.sendTimeMs !== null) {
      message.sendTimeMs = object.sendTimeMs as Long;
    } else {
      message.sendTimeMs = Long.ZERO;
    }
    return message;
  },
  toJSON(message: CommonActionSignalRichText): unknown {
    const obj: any = {};
    if (message.segments) {
      obj.segments = message.segments.map(e => e ? CommonActionSignalRichText_RichTextSegment.toJSON(e) : undefined);
    } else {
      obj.segments = [];
    }
    message.sendTimeMs !== undefined && (obj.sendTimeMs = (message.sendTimeMs || Long.ZERO).toString());
    return obj;
  },
};

export const CommonActionSignalRichText_ImageSegment = {
  encode(message: CommonActionSignalRichText_ImageSegment, writer: Writer = Writer.create()): Writer {
    for (const v of message.pictures) {
      ImageCdnNode.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.alternativeText);
    writer.uint32(26).string(message.alternativeColor);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalRichText_ImageSegment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalRichText_ImageSegment } as CommonActionSignalRichText_ImageSegment;
    message.pictures = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pictures.push(ImageCdnNode.decode(reader, reader.uint32()));
          break;
        case 2:
          message.alternativeText = reader.string();
          break;
        case 3:
          message.alternativeColor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalRichText_ImageSegment {
    const message = { ...baseCommonActionSignalRichText_ImageSegment } as CommonActionSignalRichText_ImageSegment;
    message.pictures = [];
    if (object.pictures !== undefined && object.pictures !== null) {
      for (const e of object.pictures) {
        message.pictures.push(ImageCdnNode.fromJSON(e));
      }
    }
    if (object.alternativeText !== undefined && object.alternativeText !== null) {
      message.alternativeText = String(object.alternativeText);
    } else {
      message.alternativeText = "";
    }
    if (object.alternativeColor !== undefined && object.alternativeColor !== null) {
      message.alternativeColor = String(object.alternativeColor);
    } else {
      message.alternativeColor = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalRichText_ImageSegment>): CommonActionSignalRichText_ImageSegment {
    const message = { ...baseCommonActionSignalRichText_ImageSegment } as CommonActionSignalRichText_ImageSegment;
    message.pictures = [];
    if (object.pictures !== undefined && object.pictures !== null) {
      for (const e of object.pictures) {
        message.pictures.push(ImageCdnNode.fromPartial(e));
      }
    }
    if (object.alternativeText !== undefined && object.alternativeText !== null) {
      message.alternativeText = object.alternativeText;
    } else {
      message.alternativeText = "";
    }
    if (object.alternativeColor !== undefined && object.alternativeColor !== null) {
      message.alternativeColor = object.alternativeColor;
    } else {
      message.alternativeColor = "";
    }
    return message;
  },
  toJSON(message: CommonActionSignalRichText_ImageSegment): unknown {
    const obj: any = {};
    if (message.pictures) {
      obj.pictures = message.pictures.map(e => e ? ImageCdnNode.toJSON(e) : undefined);
    } else {
      obj.pictures = [];
    }
    message.alternativeText !== undefined && (obj.alternativeText = message.alternativeText);
    message.alternativeColor !== undefined && (obj.alternativeColor = message.alternativeColor);
    return obj;
  },
};

export const CommonActionSignalRichText_PlainSegment = {
  encode(message: CommonActionSignalRichText_PlainSegment, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.text);
    writer.uint32(18).string(message.color);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalRichText_PlainSegment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalRichText_PlainSegment } as CommonActionSignalRichText_PlainSegment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.text = reader.string();
          break;
        case 2:
          message.color = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalRichText_PlainSegment {
    const message = { ...baseCommonActionSignalRichText_PlainSegment } as CommonActionSignalRichText_PlainSegment;
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text);
    } else {
      message.text = "";
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = String(object.color);
    } else {
      message.color = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalRichText_PlainSegment>): CommonActionSignalRichText_PlainSegment {
    const message = { ...baseCommonActionSignalRichText_PlainSegment } as CommonActionSignalRichText_PlainSegment;
    if (object.text !== undefined && object.text !== null) {
      message.text = object.text;
    } else {
      message.text = "";
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = object.color;
    } else {
      message.color = "";
    }
    return message;
  },
  toJSON(message: CommonActionSignalRichText_PlainSegment): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.color !== undefined && (obj.color = message.color);
    return obj;
  },
};

export const CommonActionSignalRichText_RichTextSegment = {
  encode(message: CommonActionSignalRichText_RichTextSegment, writer: Writer = Writer.create()): Writer {
    if (message.userInfo !== undefined) {
      CommonActionSignalRichText_UserInfoSegment.encode(message.userInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.plain !== undefined) {
      CommonActionSignalRichText_PlainSegment.encode(message.plain, writer.uint32(18).fork()).ldelim();
    }
    if (message.image !== undefined) {
      CommonActionSignalRichText_ImageSegment.encode(message.image, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalRichText_RichTextSegment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalRichText_RichTextSegment } as CommonActionSignalRichText_RichTextSegment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userInfo = CommonActionSignalRichText_UserInfoSegment.decode(reader, reader.uint32());
          break;
        case 2:
          message.plain = CommonActionSignalRichText_PlainSegment.decode(reader, reader.uint32());
          break;
        case 3:
          message.image = CommonActionSignalRichText_ImageSegment.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalRichText_RichTextSegment {
    const message = { ...baseCommonActionSignalRichText_RichTextSegment } as CommonActionSignalRichText_RichTextSegment;
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = CommonActionSignalRichText_UserInfoSegment.fromJSON(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    if (object.plain !== undefined && object.plain !== null) {
      message.plain = CommonActionSignalRichText_PlainSegment.fromJSON(object.plain);
    } else {
      message.plain = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = CommonActionSignalRichText_ImageSegment.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalRichText_RichTextSegment>): CommonActionSignalRichText_RichTextSegment {
    const message = { ...baseCommonActionSignalRichText_RichTextSegment } as CommonActionSignalRichText_RichTextSegment;
    if (object.userInfo !== undefined && object.userInfo !== null) {
      message.userInfo = CommonActionSignalRichText_UserInfoSegment.fromPartial(object.userInfo);
    } else {
      message.userInfo = undefined;
    }
    if (object.plain !== undefined && object.plain !== null) {
      message.plain = CommonActionSignalRichText_PlainSegment.fromPartial(object.plain);
    } else {
      message.plain = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = CommonActionSignalRichText_ImageSegment.fromPartial(object.image);
    } else {
      message.image = undefined;
    }
    return message;
  },
  toJSON(message: CommonActionSignalRichText_RichTextSegment): unknown {
    const obj: any = {};
    message.userInfo !== undefined && (obj.userInfo = message.userInfo ? CommonActionSignalRichText_UserInfoSegment.toJSON(message.userInfo) : undefined);
    message.plain !== undefined && (obj.plain = message.plain ? CommonActionSignalRichText_PlainSegment.toJSON(message.plain) : undefined);
    message.image !== undefined && (obj.image = message.image ? CommonActionSignalRichText_ImageSegment.toJSON(message.image) : undefined);
    return obj;
  },
};

export const CommonActionSignalRichText_UserInfoSegment = {
  encode(message: CommonActionSignalRichText_UserInfoSegment, writer: Writer = Writer.create()): Writer {
    if (message.user !== undefined && message.user !== undefined) {
      ZtLiveUserInfo.encode(message.user, writer.uint32(10).fork()).ldelim();
    }
    writer.uint32(18).string(message.color);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonActionSignalRichText_UserInfoSegment {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonActionSignalRichText_UserInfoSegment } as CommonActionSignalRichText_UserInfoSegment;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.user = ZtLiveUserInfo.decode(reader, reader.uint32());
          break;
        case 2:
          message.color = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonActionSignalRichText_UserInfoSegment {
    const message = { ...baseCommonActionSignalRichText_UserInfoSegment } as CommonActionSignalRichText_UserInfoSegment;
    if (object.user !== undefined && object.user !== null) {
      message.user = ZtLiveUserInfo.fromJSON(object.user);
    } else {
      message.user = undefined;
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = String(object.color);
    } else {
      message.color = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonActionSignalRichText_UserInfoSegment>): CommonActionSignalRichText_UserInfoSegment {
    const message = { ...baseCommonActionSignalRichText_UserInfoSegment } as CommonActionSignalRichText_UserInfoSegment;
    if (object.user !== undefined && object.user !== null) {
      message.user = ZtLiveUserInfo.fromPartial(object.user);
    } else {
      message.user = undefined;
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = object.color;
    } else {
      message.color = "";
    }
    return message;
  },
  toJSON(message: CommonActionSignalRichText_UserInfoSegment): unknown {
    const obj: any = {};
    message.user !== undefined && (obj.user = message.user ? ZtLiveUserInfo.toJSON(message.user) : undefined);
    message.color !== undefined && (obj.color = message.color);
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