import { ParticleState, Settings } from './constants';
import { Particle } from './Particle';
import { Point } from './Point';
import { shuffle } from './utils';

export class ParticleGenerator {
    particles: Particle[] = [];
    index: number = 0;

    constructor(origin: Point, amount: number = Settings.initialParticles, state: ParticleState = ParticleState.Idle) {
        this.particles = new Array(amount);

        for (let i = 0; i < amount; i++) {
            const particle = new Particle(origin.shuffle());
            particle.state = state;

            this.particles[i] = particle;
        }

        this.index = 0;
    }

    reset() {
        this.index = 0;
    }

    shuffleRest() {
        const removalIndex = Math.min(this.index + 150, this.particles.length);
        this.particles.splice(removalIndex);

        for (let i = this.index; i < removalIndex; i++) {
            this.particles[i].random();
        }

        shuffle(this.particles);
    }

    getParticle(origin: Point) {
        if (this.index >= this.particles.length) {
            this.particles.push(new Particle(origin.shuffle()));
        }

        return this.particles[this.index++];
    }

    getParticles() {
        return this.particles;
    }
}
