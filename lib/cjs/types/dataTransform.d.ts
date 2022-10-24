export declare class DataTransform {
    private data;
    private data2;
    setData(t: string | string[]): void;
    reverse(): DataTransform;
    rotate(shift: number, reverse?: boolean): DataTransform;
    fork(shift: number): DataTransform;
    join(): DataTransform;
    toggle(): DataTransform;
    shuffle(): DataTransform;
    deshuffle(): DataTransform;
    shake(shift: number, reverse?: boolean): DataTransform;
    toString(fmt?: string): string;
    toArray(): string[];
}
//# sourceMappingURL=dataTransform.d.ts.map