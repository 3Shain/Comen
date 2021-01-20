import { InjectionToken } from '@angular/core';
import { GammaConfiguration } from './gamma-config.service';
import { Message } from '@comen/common';

export interface MessageProvider {
    registerOnMessage(callback:(message:Message)=>unknown):void;
    registerOnConfiguration(callback:(config:GammaConfiguration)=>unknown):void;
}

export const MESSAGE_PROVIDER = new InjectionToken<MessageProvider>('gamma_message_provider');