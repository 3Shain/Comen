import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '@comen/gamma';

export interface CommentSource {
    readonly type: string;
    connect(options: unknown): Observable<Message>;
}

export const SOURCE_PROVIDER = new InjectionToken<CommentSource[]>('comment sources');