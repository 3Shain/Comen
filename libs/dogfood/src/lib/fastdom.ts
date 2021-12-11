import { effect } from 'kairo';
import { stream } from '@kairo/concurrency';

export function useFastdom() {
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
