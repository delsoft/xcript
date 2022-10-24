export declare class PasswordIterator {
    private _delta;
    private idx;
    private _step;
    data: string[];
    constructor(data: string[]);
    set delta(value: number);
    get delta(): number;
    set step(value: number);
    get step(): number;
    reset(): void;
    next(): number;
}
//# sourceMappingURL=password_iterator.d.ts.map