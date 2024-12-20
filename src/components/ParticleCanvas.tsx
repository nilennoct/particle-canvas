import * as React from 'react';
import { ParticleState } from '../constants';
import { Lottery } from '../Lottery';
import { Particle } from '../Particle';
import { SampleCanvas } from '../SampleCanvas';

export interface ParticleCanvasProps {
    text: string;
    timestamp: number;
}

export function ParticleCanvas({ text, timestamp }: ParticleCanvasProps) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sampleCanvas = React.useMemo(() => new SampleCanvas(), []);
    const lotteryRef = React.useRef<Lottery>();

    function resize() {
        const canvas = canvasRef.current;

        if (canvas === null) {
            return;
        }

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        sampleCanvas.resize(canvas.width, canvas.height);
    }

    React.useEffect(() => {
        resize();
        loop();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [canvasRef.current]);

    React.useEffect(() => {
        if (text === '#go') {
            if (!lotteryRef.current) {
                lotteryRef.current = new Lottery();
            }

            const lottery = lotteryRef.current!;

            if (lottery.size === 0) {
                sampleCanvas.renderText('OVER');
                return;
            }

            const [from, to] = lottery.execute();

            console.info(`From ${from} to ${to}`);

            sampleCanvas.renderText(from);

            setTimeout(() => {
                sampleCanvas.renderText(to);
            }, 2000);
        } else if (text.startsWith('#lottery-')) {
            lotteryRef.current = new Lottery(text.slice(1));
        } else {
            sampleCanvas.renderText(text);
        }
    }, [text, timestamp]);

    function _clear() {
        if (canvasRef.current === null) {
            return;
        }

        const canvas = canvasRef.current;

        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    }

    function renderParticle(particle: Particle) {
        const context = canvasRef.current?.getContext('2d');

        if (!context) {
            return;
        }

        const location = particle.location();

        if (particle.state & ParticleState.Move) {
            context.fillStyle = particle.color;
        } else {
            context.fillStyle = 'rgba(255,255,255,' + particle.alpha + ')';
        }

        context.beginPath();
        context.arc(location.x, location.y, particle.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }

    function loop() {
        _clear();

        sampleCanvas.particleGenerator.getParticles().forEach(renderParticle);

        requestAnimationFrame(loop);
    }

    return <canvas className="canvas-main" ref={canvasRef} />;
}
