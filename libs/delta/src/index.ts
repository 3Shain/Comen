import { ComenAddonMetadata, Message } from '@comen/common';
import { stream } from '@kairo/concurrency';
import { EVENT_MESSAGE } from './lib/tokens';

const DELTA_METADATA: ComenAddonMetadata = {
    name: 'delta',
    displayName: '评论栏-δ型',
    description: '高度自定义评论栏',
    editable: true,
    configuration: {
        displayName: 'delta',
        sections: {},
    },
};

export async function preloadDelta() {
    const setup = await import('./lib/delta').then((x) => x.setupDelta);
    registerOverlay(DELTA_METADATA, (instance) => {
        const [messages, emitMessage] = stream<Message>();
        const subscription = instance.message().subscribe(emitMessage);
        const dispose = setup(instance.rootElement, () => {
            return {
                [EVENT_MESSAGE]: messages,
            };
        });
        return () => {
            subscription.unsubscribe();
            dispose();
        }
    });
}
