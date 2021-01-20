import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '@comen/common';

export interface MessageSource {
    readonly type: string;
    connect(options: unknown): Observable<Message>;
}

export const SOURCE_PROVIDER = new InjectionToken<MessageSource[]>('Message sources');