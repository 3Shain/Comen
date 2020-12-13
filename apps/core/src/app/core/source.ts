import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '@comen/gamma';

export interface CommentSource {
    readonly type:string;
    connect(options:any):Observable<Message>;
}

export const SOURCE_PROVIDER = new InjectionToken<CommentSource[]>('comment sources');