import { Message } from '@comen/gamma'

export type SystemMessage = {
    type: 'system';
    // eslint-disable-next-line
    data: any;
}

export type LiveStartMessage = {
    type: 'livestart';
}

export type LiveStopMessage = {
    type: 'livestop';
}

export type ComenMessage = Message | SystemMessage | LiveStartMessage | LiveStopMessage;