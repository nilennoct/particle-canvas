import { Colors, Settings } from './constants';
import { ParticleGenerator } from './ParticleGenerator';
import { Point } from './Point';
import { Vector } from './Vector';

export class SampleCanvas {
    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d')!;
    gap = Settings.gap || 5;
    fontSize = 500;
    origin = new Point();
    center = new Point(window.innerWidth / 2, window.innerHeight / 2);
    particleGenerator: ParticleGenerator = new ParticleGenerator(this.center);

    constructor() {
        if (Settings.debug) {
            this.canvas.className = 'canvas-sample';
            document.body.appendChild(this.canvas);
        }
    }

    resize(width: number, height: number) {
        this.canvas.width = Math.floor(width * 0.8 / this.gap) * this.gap;
        this.canvas.height = Math.floor(height * 0.8 / this.gap) * this.gap;

        this.initContext();

        this.origin = new Point((width - this.canvas.width) / 2, (height - this.canvas.height) / 2);
        this.center = new Point(width / 2, height / 2);

        if (Settings.debug) {
            this.canvas.style.cssText = 'top:' + this.origin.y + 'px;left:' + this.origin.x + 'px';
        }

        this.clear();
    }

    renderText(text: string) {
        this.clear();

        this.measureText(text);

        this.context.fillText(text, this.canvas.width / 2, this.canvas.height / 2);

        this.generateParticles();
    }

    generateParticles() {
        const pixels = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = pixels.data;

        const width = pixels.width;
        let x = 0;
        let y = 0;

        const vector = new Vector(new Point(), this.origin);

        this.particleGenerator.reset();

        for (let i = 0; i < data.length; i += (4 * this.gap)) {
            if (data[i + 3] > 0) {
                const particle = this.particleGenerator.getParticle(this.origin);

                particle.moveTo(new Point(x, y).move(vector));

                if (data[i] < 255 || data[i + 1] > 0 || data[i + 2] > 0) {
                    particle.color = 'rgb(' + [data[i], data[i + 1], data[i + 2]].join(',') + ')';
                } else if (particle.color.indexOf('#') < 0) {
                    particle.color = Colors[Math.floor(Math.random() * 7)];
                }
            }

            x += this.gap;

            if (x >= width) {
                x = 0;
                y += this.gap;
                i += 4 * this.canvas.width * (this.gap - 1);
            }
        }

        this.particleGenerator.shuffleRest();
    }

    shuffle(radius = 200) {
        for (const particle of this.particleGenerator.getParticles()) {
            particle.moveTo(this.center.shuffle(radius));
        }
    }

    private initContext() {
        this.context.fillStyle = '#f00';
        this.context.textBaseline = 'middle';
        this.context.textAlign = 'center';
        this.context.font = 'bold ' + this.fontSize + 'px Helvetica Neue, Helvetica, Arial, sans-serif';
    }

    private clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (Settings.debug) {
            this.context.save();
            this.context.fillStyle = '#000';
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.restore();
        }
    }

    private measureText(text: string) {
        const fontSize = Math.min(
            Math.floor(this.canvas.height * 0.8),
            this.canvas.width / this.context.measureText(text).width * this.fontSize,
        );

        this.context.font = 'bold ' + fontSize + 'px Helvetica Neue, Helvetica, Arial, sans-serif';
        this.fontSize = fontSize;
    }
}
