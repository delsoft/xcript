export class PasswordIterator {
    _delta = -1;
    idx = -1;
    _step = 1;
    data;
    constructor(data) {
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
        const l = this.data.length;
        if (this._delta > 128 || this._delta < 1)
            this._delta = 1;
        const idx = this.idx + 1 + this._delta;
        this.idx = idx - Math.trunc(idx / l) * l;
        this._delta += this._step;
        return this.data[this.idx]?.codePointAt(0) || 127;
    }
}
