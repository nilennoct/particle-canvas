import { Settings } from './constants';
import { Vector } from './Vector';

export class Point {
    constructor(
        public x: number = 0,
        public y: number = 0,
    ) {}

    shuffle(radius: number = Settings.originRadius) {
        radius = radius * Math.random();

        const angle = Math.random() * 6.283;
        const dx = radius * Math.sin(angle);
        const dy = radius * Math.cos(angle);

        return new Point(this.x + dx, this.y + dy);
    }

    move(vector: Vector) {
        this.x += vector.dx;
        this.y += vector.dy;

        return this;
    }

    isEqual(point: Point) {
        return this == point || (Math.abs(this.x - point.x) <= 1 && Math.abs(this.y - point.y) <= 1);
    }

    toString() {
        return 'Point(' + this.x + ', ' + this.y + ')';
    }
}
