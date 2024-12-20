import { Colors, ParticleState, Settings } from './constants';
import { Point } from './Point';
import { Vector } from './Vector';

export class Particle {
    origin: Point;
    target: Point;
    radius: number;
    color: string;
    alpha: number;
    state: ParticleState;

    constructor(origin: Point = new Point(), radius: number = Settings.radius) {
        this.origin = origin;
        this.target = this.origin;
        this.radius = radius + Math.random() * 4 - 2;

        this.color = Colors[Math.floor(Math.random() * 7)];
        this.alpha = Math.random() * 0.5;

        this.state = ParticleState.Idle;
    }

    location() {
        if (this.origin.isEqual(this.target)) {
            switch (this.state) {
                case ParticleState.Idle:
                    if (Math.random() > 0.99) {
                        this.state = ParticleState.Wander;
                        this.target = this.target.shuffle(30);
                    }

                    return this.origin;

                case ParticleState.Wander:
                    this.state = ParticleState.Idle;

                    return this.origin;

                case ParticleState.Mass:
                    ////if (Math.random() < 0.5) {
                    //  if (this.target.isEqual(SampleCanvas.center())) {
                    //    this.target = SampleCanvas.center().shuffle(200);
                    //  }
                    //  else {
                    //    this.target = SampleCanvas.center();
                    //  }
                    ////}
                    this.random();
                    //this.target = SampleCanvas.center().shuffle(200);
                    //this.random();
                    this.state = ParticleState.Mass;

                    return this.origin;

                default:
                    const rand = Math.random();

                    if (rand < 0.0001) {
                        this.state = ParticleState.Wander;
                        this.random();
                    } else if (rand < 0.05) {
                        this.target = this.target.shuffle(Math.floor(5 / this.radius));
                    }

                    return this.origin;
            }
        } else {
            const vector = new Vector(this.origin, this.target);

            vector.multiply(Settings.e * (this.state === ParticleState.Mass ? 1 : 1));

            this.origin.move(vector);

            return this.origin;
        }
    }

    moveTo(point: Point) {
        this.target = point;
        this.state = ParticleState.Move;
    }

    shuffle(radius: number) {
        this.target = this.target.shuffle(radius);
        this.state = ParticleState.Idle;
    }

    random() {
        this.target = new Point(
            Math.floor(window.innerWidth * Math.random()),
            Math.floor(window.innerHeight * Math.random()),
        );
        this.state = ParticleState.Idle;
    }
}
