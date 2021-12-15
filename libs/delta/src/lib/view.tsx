import { withKairo } from '@kairo/react';
import { effect, mut, ref } from 'kairo';
import React from 'react';
import { Message } from '@comen/common';
import Text from './text';
import Member from './membership';
import Sticker from './sticker';
import Superchat from './superchat';
import { readMessages } from './tokens';
import { AbortablePromise, task, stream } from '@kairo/concurrency';

export default withKairo<{}>(() => {
  let key = 0;

  const [scroller, bindScroller] = ref<HTMLDivElement>(null);
  const [items, bindItems] = ref<HTMLDivElement>(null);

  const fastdom = useFastdom();

  const bufferQueue: (Message & { id: number })[] = [];
  const messages = readMessages();
  effect(() =>
    messages.listen((next) => {
      if (next.type === 'text') {
        bufferQueue.push({
          ...next,
          id: key++,
        });
      }
    })
  );

  const [renderList, setRenderlist] = mut<(Message & { id: number })[]>([]);

  const startCoroutine = task(function* () {
    const itemsElement = items.current;
    const scrollerElement = scroller.current;
    let lastAnimated = 0;
    while (true) {
      if (bufferQueue.length === 0) {
        yield* fastdom.mutate;
        continue;
      }
      yield* fastdom.measure;
      const insertedMessage = bufferQueue.pop();
      setRenderlist([...renderList.current.slice(-50), insertedMessage]);
      yield* fastdom.mutate;
      yield* fastdom.measure; //wait next frame
      const inserted = itemsElement.lastElementChild as HTMLElement;
      const insertedHeight = inserted.offsetHeight;
      const itemsHeight = itemsElement.offsetHeight;
      const scrollerHeight = scrollerElement.offsetHeight;
      yield* fastdom.mutate;
      if (scrollerHeight < itemsHeight) {
        scrollerElement.scrollTop = itemsHeight - scrollerHeight;
        if (performance.now() - lastAnimated < 500) {
          lastAnimated = performance.now();
          continue;
        }
        const animationOffset = Math.min(
          itemsHeight - scrollerHeight,
          insertedHeight
        );
        const animation = itemsElement.animate(
          [
            { transform: `translate3d(0,${animationOffset}px,0)` },
            { transform: `translate3d(0,0px,0)` },
          ],
          {
            duration: 100,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
          }
        );
        lastAnimated = performance.now();
        yield* new AbortablePromise((resolve) => {
          animation.onfinish = resolve;
        });
      }
    }
  });

  effect(() => startCoroutine());

  return ($) => {
    return (
      <div id="scroller" ref={bindScroller}>
        {/* <div id="offset" ref={setOffset}> */}
        <div id="items" ref={bindItems}>
          {$(renderList).map((message) => {
            switch (message.type) {
              case 'text':
                return (
                  <Text
                    key={message['id']}
                    {...message}
                  />
                );
              case 'member':
                return (
                  <Member
                    key={message['id']}
                    content={'welcome to '}
                    username={message.username}
                    avatar={message.avatar as string}
                  />
                );
              case 'paid':
                return (
                  <Superchat
                    key={message['id']}
                    content={message.content}
                    username={message.username}
                    avatar={message.avatar as string}
                  />
                );
              case 'richtext':
                return;
              case 'sticker':
                return (
                  <Sticker
                    key={message['id']}
                    content={'wtf'}
                    username={message.username}
                    avatar={message.avatar as string}
                  />
                );
                return;
            }
          })}
        </div>
        {/* </div> */}
      </div>
    );
  };
});

function useFastdom() {
    const [measure, doMeasure] = stream<void>();
    const [mutate, doMutate] = stream<void>();

    effect(() => {
        const rafCallback = () => {
            doMeasure();
            doMutate();
            id = requestAnimationFrame(rafCallback);
        };
        let id = requestAnimationFrame(rafCallback);
        return () => cancelAnimationFrame(id);
    });
    return {
        measure,
        mutate,
    };
}
