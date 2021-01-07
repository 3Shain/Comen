/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface ImageCdnNode {
  cdn: string;
  url: string;
  urlPattern: string;
}

const baseImageCdnNode: object = {
  cdn: "",
  url: "",
  urlPattern: "",
};

export const protobufPackage = 'AcFunDanmu'

export const ImageCdnNode = {
  encode(message: ImageCdnNode, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.cdn);
    writer.uint32(18).string(message.url);
    writer.uint32(26).string(message.urlPattern);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ImageCdnNode {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImageCdnNode } as ImageCdnNode;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cdn = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.urlPattern = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ImageCdnNode {
    const message = { ...baseImageCdnNode } as ImageCdnNode;
    if (object.cdn !== undefined && object.cdn !== null) {
      message.cdn = String(object.cdn);
    } else {
      message.cdn = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = "";
    }
    if (object.urlPattern !== undefined && object.urlPattern !== null) {
      message.urlPattern = String(object.urlPattern);
    } else {
      message.urlPattern = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ImageCdnNode>): ImageCdnNode {
    const message = { ...baseImageCdnNode } as ImageCdnNode;
    if (object.cdn !== undefined && object.cdn !== null) {
      message.cdn = object.cdn;
    } else {
      message.cdn = "";
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = object.url;
    } else {
      message.url = "";
    }
    if (object.urlPattern !== undefined && object.urlPattern !== null) {
      message.urlPattern = object.urlPattern;
    } else {
      message.urlPattern = "";
    }
    return message;
  },
  toJSON(message: ImageCdnNode): unknown {
    const obj: any = {};
    message.cdn !== undefined && (obj.cdn = message.cdn);
    message.url !== undefined && (obj.url = message.url);
    message.urlPattern !== undefined && (obj.urlPattern = message.urlPattern);
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