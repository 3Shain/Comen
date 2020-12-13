import { InjectionToken } from '@angular/core';
import { Message } from './message';

export interface MessageProvider {
    registerOnMessage(callback:(message:Message)=>unknown):void;
}

export const MESSAGE_PROVIDER = new InjectionToken<MessageProvider>("gamma_message_provider");