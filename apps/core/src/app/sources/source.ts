import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ComenMessage } from '../common/message';

export interface CommentSource {
    readonly type: string;
    connect(options: unknown): Observable<ComenMessage>;
}

export const SOURCE_PROVIDER = new InjectionToken<CommentSource[]>('comment sources');