export class PasswordIterator {
  private _delta: number = -1;
  private idx: number = -1;
  private _step: number = 1;
  data: string[];

  constructor(data: string[]) {
    this.data = data;
  }

  set delta(value: number) {
    this._delta = value;
  }

  get delta() {
    return this._delta;
  }

  set step(value: number) {
    this._step = value;
    if (this._step < 1) this._step = 1;
  }

  get step() {
    return this._step;
  }

  public reset() {
    this.idx = -1;
    this._delta = -1;
  }

  public next(): number {
    const l = this.data.length;
    if (this._delta > 128 || this._delta < 1) this._delta = 1;
    const idx = this.idx + 1 + this._delta;
    this.idx = idx - Math.trunc(idx / l) * l;
    this._delta += this._step;
    return this.data[this.idx]?.codePointAt(0) || 127;
  }
}
