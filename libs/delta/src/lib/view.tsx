import { withKairo } from '@kairo/react';
import { effect, mut, reduced, task } from 'kairo';
import React from 'react';
import { Message } from '@comen/common';
import { useFastdom } from '@comen/dogfood';
import Text from './text';
import Member from './membership';
import Sticker from './sticker';
import Superchat from './superchat';
import { readMessages } from './tokens';

export default withKairo(() => {
    let key = 0;

    const [scroller, setScroller] = mut<HTMLDivElement>(null);
    const [offset, setOffset] = mut<HTMLDivElement>(null);
    const [items, setItems] = mut<HTMLDivElement>(null);

    const fastdom = useFastdom();

    const bufferQueue: (Message & { id: number })[] = [];
    const messages = readMessages();
    effect(() =>
        messages.listen((next) => {
            bufferQueue.push({
                ...next,
                id: key++,
            });
        })
    );

    const [renderList, setRenderlist] = mut(bufferQueue);

    const startCoroutine = task(function* () {
        while (true) {
            if (bufferQueue.length === 0) {
                yield* fastdom.mutate;
                continue;
            }
            yield* fastdom.measure;
            const inserted = bufferQueue.pop();
            setRenderlist([...renderList.value, inserted]);
            yield* fastdom.mutate;
        }
    });

    effect(() => startCoroutine());

    return () => (
        <div id="delta">
            <div id="scroller" ref={setScroller}>
                <div id="offset" ref={setOffset}>
                    <div id="items" ref={setItems}>
                        {renderList.value.map((message) => {
                            switch (message.type) {
                                case 'text':
                                    return (
                                        <Text
                                            key={message['id']}
                                            content={message.content}
                                            username={message.username}
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
                </div>
            </div>
        </div>
    );
});
