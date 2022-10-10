export class DataTransform {
  private data: string[] = [];
  private data2: string[] = [];

  setData(t: string | string[]) {
    this.data = Array.isArray(t) ? t : Array.from(t);
    this.data2 = [];
  }

  reverse(): DataTransform {
    this.data = this.data.reverse();
    return this;
  }

  rotate(shift: number, reverse: boolean = false): DataTransform {
    const l = this.data.length;
    shift = shift < 1 ? 1 : shift;
    let idx = shift - Math.trunc(shift / l) * l;
    if (reverse) idx = this.data.length - idx;
    const tmp = this.data.splice(idx);
    this.data.unshift(...tmp);
    return this;
  }

  fork(shift: number): DataTransform {
    const l = this.data.length;
    shift = shift < 1 ? 1 : shift;
    let idx = shift - Math.trunc(shift / l) * l;
    this.join();
    this.data2 = this.data.splice(idx);

    return this;
  }

  join(): DataTransform {
    this.data = [this.data, this.data2].flat();
    this.data2 = [];
    return this;
  }

  toggle(): DataTransform {
    if (!!this.data2) {
      const w = this.data;
      this.data = this.data2;
      this.data2 = w;
    }
    return this;
  }

  shuffle(): DataTransform {
    const l = Math.trunc(this.data.length / 2) + (this.data.length % 2);
    let a: string[] = [];
    for (var i = 0; i <= l; i++) {
      a.push(this.data[i]);
      a.push(this.data[i + l]);
    }
    a.splice(this.data.length);
    this.data = a;

    return this;
  }

  deshuffle(): DataTransform {
    const l = this.data.length;
    let a: string[] = [];
    let b: string[] = [];

    for (var i = 0; i < this.data.length; i += 2) {
      b.push(this.data[i + 1]);
      a.push(this.data[i]);
    }

    this.data = [a, b].flat();
    this.data.splice(l);

    return this;
  }

  shake(shift: number, reverse: boolean = false): DataTransform {
    let op2 = shift % 2;
    op2 += shift % 3 == 0 ? 1 : 0;
    op2 += shift % 5 == 0 ? 1 : 0;
    if (reverse)
      switch (op2) {
        case 0:
          this.deshuffle().rotate(shift, reverse);
          break;
        case 1:
          this.reverse().rotate(shift, reverse);
          break;
        case 2:
          this.reverse().deshuffle();
          break;
        case 3:
          this.reverse().deshuffle().rotate(shift, true);
          break;
      }
    else
      switch (op2) {
        case 0:
          this.rotate(shift).shuffle();
          break;
        case 1:
          this.rotate(shift).reverse();
          break;
        case 2:
          this.shuffle().reverse();
          break;
        case 3:
          this.rotate(shift).shuffle().reverse();
          break;
      }

    return this;
  }

  toString(fmt?: string): string {
    const a = !fmt || fmt == "left" || fmt == "all" ? this.data.join("") : "";
    const b = !fmt || fmt == "right" || fmt == "all" ? this.data2.join("") : "";
    return a + b;
  }

  toArray() {
    return [this.data, this.data2].flat();
  }
}
