"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordIterator = void 0;
class PasswordIterator {
    constructor(data) {
        this._delta = -1;
        this.idx = -1;
        this._step = 1;
        this.data = data;
    }
    set delta(value) {
        this._delta = value;
    }
    get delta() {
        return this._delta;
    }
    set step(value) {
        this._step = value;
        if (this._step < 1)
            this._step = 1;
    }
    get step() {
        return this._step;
    }
    reset() {
        this.idx = -1;
        this._delta = -1;
    }
    next() {
        var _a;
        const l = this.data.length;
        if (this._delta > 128 || this._delta < 1)
            this._delta = 1;
        const idx = this.idx + 1 + this._delta;
        this.idx = idx - Math.trunc(idx / l) * l;
        this._delta += this._step;
        return ((_a = this.data[this.idx]) === null || _a === void 0 ? void 0 : _a.codePointAt(0)) || 127;
    }
}
exports.PasswordIterator = PasswordIterator;
