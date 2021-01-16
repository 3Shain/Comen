
export function nextFrame() {
    return new Promise<number>((res) => {
        requestAnimationFrame(res);
    });
}

export function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
}