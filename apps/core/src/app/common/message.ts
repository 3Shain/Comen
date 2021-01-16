import { Message } from "@comen/gamma"

export type SystemMessage = {
    type: 'system';
    data: any;
}

export type LiveStartMessage = {
    type: 'livestart';
}

export type LiveStopMessage = {
    type: 'livestop';
}

export type ComenMessage = Message | SystemMessage | LiveStartMessage | LiveStopMessage;