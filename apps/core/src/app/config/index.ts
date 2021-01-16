import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

export { ComenConfiguration, parseConfiguration, serializeConfiguration,DEFAULT_CONFIG } from './config';
export { mergeQueryParameters } from './merge-query';

export const CSSINJECT_CONFIG_TOKEN = new InjectionToken<Subject<any>>('config injection');