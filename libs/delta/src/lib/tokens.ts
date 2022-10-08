import { Message } from '@comen/common';
import { EventStream } from '@kairo/concurrency';
import { Identifier, injected } from 'kairo';

export const EVENT_MESSAGE = Identifier.of<EventStream<Message>>('message');

export function readMessages() {
  return injected(EVENT_MESSAGE);
}
