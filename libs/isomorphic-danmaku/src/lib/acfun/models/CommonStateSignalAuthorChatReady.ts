/* eslint-disable */
import { AuthorChatPlayerInfo } from './AuthorChatPlayerInfo';
import { Writer, Reader } from 'protobufjs/minimal';


export interface CommonStateSignalAuthorChatReady {
  authorChatId: string;
  inviterUserInfo: AuthorChatPlayerInfo | undefined;
  inviteeUserInfo: AuthorChatPlayerInfo | undefined;
}

const baseCommonStateSignalAuthorChatReady: object = {
  authorChatId: "",
};

export const protobufPackage = 'AcFunDanmu'

export const CommonStateSignalAuthorChatReady = {
  encode(message: CommonStateSignalAuthorChatReady, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.authorChatId);
    if (message.inviterUserInfo !== undefined && message.inviterUserInfo !== undefined) {
      AuthorChatPlayerInfo.encode(message.inviterUserInfo, writer.uint32(18).fork()).ldelim();
    }
    if (message.inviteeUserInfo !== undefined && message.inviteeUserInfo !== undefined) {
      AuthorChatPlayerInfo.encode(message.inviteeUserInfo, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): CommonStateSignalAuthorChatReady {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCommonStateSignalAuthorChatReady } as CommonStateSignalAuthorChatReady;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authorChatId = reader.string();
          break;
        case 2:
          message.inviterUserInfo = AuthorChatPlayerInfo.decode(reader, reader.uint32());
          break;
        case 3:
          message.inviteeUserInfo = AuthorChatPlayerInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): CommonStateSignalAuthorChatReady {
    const message = { ...baseCommonStateSignalAuthorChatReady } as CommonStateSignalAuthorChatReady;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = String(object.authorChatId);
    } else {
      message.authorChatId = "";
    }
    if (object.inviterUserInfo !== undefined && object.inviterUserInfo !== null) {
      message.inviterUserInfo = AuthorChatPlayerInfo.fromJSON(object.inviterUserInfo);
    } else {
      message.inviterUserInfo = undefined;
    }
    if (object.inviteeUserInfo !== undefined && object.inviteeUserInfo !== null) {
      message.inviteeUserInfo = AuthorChatPlayerInfo.fromJSON(object.inviteeUserInfo);
    } else {
      message.inviteeUserInfo = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<CommonStateSignalAuthorChatReady>): CommonStateSignalAuthorChatReady {
    const message = { ...baseCommonStateSignalAuthorChatReady } as CommonStateSignalAuthorChatReady;
    if (object.authorChatId !== undefined && object.authorChatId !== null) {
      message.authorChatId = object.authorChatId;
    } else {
      message.authorChatId = "";
    }
    if (object.inviterUserInfo !== undefined && object.inviterUserInfo !== null) {
      message.inviterUserInfo = AuthorChatPlayerInfo.fromPartial(object.inviterUserInfo);
    } else {
      message.inviterUserInfo = undefined;
    }
    if (object.inviteeUserInfo !== undefined && object.inviteeUserInfo !== null) {
      message.inviteeUserInfo = AuthorChatPlayerInfo.fromPartial(object.inviteeUserInfo);
    } else {
      message.inviteeUserInfo = undefined;
    }
    return message;
  },
  toJSON(message: CommonStateSignalAuthorChatReady): unknown {
    const obj: any = {};
    message.authorChatId !== undefined && (obj.authorChatId = message.authorChatId);
    message.inviterUserInfo !== undefined && (obj.inviterUserInfo = message.inviterUserInfo ? AuthorChatPlayerInfo.toJSON(message.inviterUserInfo) : undefined);
    message.inviteeUserInfo !== undefined && (obj.inviteeUserInfo = message.inviteeUserInfo ? AuthorChatPlayerInfo.toJSON(message.inviteeUserInfo) : undefined);
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