import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

interface BeamsBackgroundProps {
    className?: string;
    intensity?: 'subtle' | 'medium' | 'strong';
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

const MINIMUM_BEAMS = 20;
const OPACITY_MAP = { subtle: 0.5, medium: 0.75, strong: 1 } as const;

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        // faixa de matiz da marca: verde (~140) até azul (~205)
        hue: 140 + Math.random() * 65,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export function BeamsBackground({ className, intensity = 'subtle' }: BeamsBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const rafRef = useRef<number>(0);
    const reducedMotion = useStore((s) => s.reducedMotion);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        function drawBeam(beam: Beam) {
            ctx!.save();
            ctx!.translate(beam.x, beam.y);
            ctx!.rotate((beam.angle * Math.PI) / 180);
            const pulsingOpacity =
                beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * OPACITY_MAP[intensity];
            const gradient = ctx!.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue}, 70%, 55%, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, 70%, 55%, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, 70%, 55%, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, 70%, 55%, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, 70%, 55%, ${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 70%, 55%, 0)`);
            ctx!.fillStyle = gradient;
            ctx!.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx!.restore();
        }

        function resetBeam(beam: Beam, index: number, total: number) {
            const column = index % 3;
            const spacing = canvas!.width / 3;
            beam.y = canvas!.height + 100;
            beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 140 + (index * 65) / total;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function updateCanvasSize() {
            const dpr = window.devicePixelRatio || 1;
            const parent = canvas!.parentElement;
            const width = parent?.clientWidth ?? window.innerWidth;
            const height = parent?.clientHeight ?? window.innerHeight;
            canvas!.width = width * dpr;
            canvas!.height = height * dpr;
            canvas!.style.width = `${width}px`;
            canvas!.style.height = `${height}px`;
            ctx!.setTransform(1, 0, 0, 1, 0, 0);
            ctx!.scale(dpr, dpr);

            const total = Math.round(MINIMUM_BEAMS * 1.5);
            beamsRef.current = Array.from({ length: total }, () =>
                createBeam(canvas!.width, canvas!.height)
            );
        }

        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);

        function renderStaticFrame() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            ctx!.filter = 'blur(35px)';
            beamsRef.current.forEach((beam) => drawBeam(beam));
        }

        function animate() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'blur(35px)';
            const total = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;
                if (beam.y + beam.length < -100) resetBeam(beam, index, total);
                drawBeam(beam);
            });
            rafRef.current = requestAnimationFrame(animate);
        }

        if (reducedMotion) {
            renderStaticFrame();
        } else {
            animate();
        }

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            cancelAnimationFrame(rafRef.current);
        };
    }, [intensity, reducedMotion]);

    return (
        <div className={`beams-background ${className ?? ''}`}>
            <canvas ref={canvasRef} className="beams-background__canvas" />
            {!reducedMotion && <div className="beams-background__pulse" />}
        </div>
    );
}