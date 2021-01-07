import { Crypto } from "@peculiar/webcrypto";

export const crypto = globalThis.window ? window?.crypto : new Crypto();