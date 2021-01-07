import { crypto } from '../crypto';
import { Writer } from 'protobufjs/minimal';
import { PacketHeader, PacketHeader_EncryptionMode } from './models/PacketHeader';

export type Encodable<T> = {
    encode(message: T, writer?: Writer): Writer;
}

export type Decodable<T> = {
    decode(input: Uint8Array): T;
}

export async function encrypt(body: Uint8Array, key: CryptoKey) {
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const algo = {
        name: "AES-CBC",
        iv: iv
    };
    const encrypted = await crypto.subtle.encrypt(algo, key, body);
    const buf = new Uint8Array(iv.byteLength + encrypted.byteLength);
    buf.set(iv, 0);
    buf.set(new Uint8Array(encrypted), iv.byteLength);
    return buf;
}

export async function decrypt(body: Uint8Array, key: CryptoKey) {
    const iv = body.slice(0, 16);
    const algo = {
        name: "AES-CBC",
        iv: iv
    };
    return new Uint8Array(await crypto.subtle.decrypt(algo, key, body.slice(16)));
}

export async function encode(header: PacketHeader, body: Uint8Array, key: CryptoKey) {
    const bHeader = PacketHeader.encode(header).finish();
    const ec = await encrypt(body, key);
    const len = 12 /** header offset */ + bHeader.byteLength + ec.byteLength;
    const buf = new Uint8Array(len);
    const view = new DataView(buf.buffer);
    view.setUint32(0, 0xABCD0001);
    view.setInt32(4, bHeader.byteLength);
    view.setInt32(8, ec.byteLength);
    buf.set(bHeader, 12);
    buf.set(ec, 12 + bHeader.byteLength);
    return buf;
}

export async function decode<T>(type: Decodable<T>, buf: Uint8Array, serviceKey: CryptoKey, sessionKey: CryptoKey): Promise<[PacketHeader, T]> {
    const view = new DataView(buf.buffer);
    const headerLength = view.getInt32(4);
    const payloadLength = view.getInt32(8);
    const header = PacketHeader.decode(buf.slice(12, 12 + headerLength));
    let payload = buf.slice(12 + headerLength, 12 + headerLength + payloadLength);
    if (header.encryptionMode != PacketHeader_EncryptionMode.kEncryptionNone) {
        const key = header.encryptionMode == PacketHeader_EncryptionMode.kEncryptionServiceToken ? serviceKey : sessionKey;
        payload = await decrypt(payload, key);
    }
    const parsed = type.decode(payload);
    return [header, parsed];
}