import { Message } from "./message";

export type FilterNextFunction = (msg:Message)=>unknown;
export type FilterFunction = (next:FilterNextFunction)=>FilterNextFunction;