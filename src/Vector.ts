import { Point } from './Point';

export class Vector {
    dx: number;
    dy: number;

    constructor(from: Point, to: Point) {
        this.dx = to.x - from.x;
        this.dy = to.y - from.y;
    }

    multiply(e: number) {
        this.dx *= e;
        this.dy *= e;
    }

    length() {
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    }

    toString() {
        return 'Vector<' + this.dx + ', ' + this.dy + '>';
    }

    valueOf() {
        return this.length;
    }
}
