import { Observable, of, OperatorFunction } from 'rxjs';
import {
  Message,
  TextMessage,
  StickerMessage,
  PaidMessage,
  MemberMessage,
  LiveStartMessage,
  LiveStopMessage,
  SystemMessage,
  RichTextMessage,
  SafeAny,
} from '@comen/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestSource {
  readonly type = 'test';

  constructor() {}

  connect(config: {}) {
    return new Observable((observer) => {

      return () => {};
    }).pipe() as Observable<Message>;
  }
}
