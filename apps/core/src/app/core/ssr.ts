import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';

@Injectable()
export class SSRService {


    constructor(
        @Inject(PLATFORM_ID) private platform: Object
    ) { }

    serverSideForbidden<T>(): OperatorFunction<T, T> {
        return (upstream) => {
            if (isPlatformServer(this.platform)) {
                return new Observable((observer) => {
                    observer.complete();
                });
            }
            return upstream;
        }
    }
}