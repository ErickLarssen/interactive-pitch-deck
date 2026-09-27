import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

// Anima o primeiro número de um texto já formatado ("62 Mt", "22,3%"),
// preservando prefixo/sufixo e a quantidade de casas decimais. Texto
// sem número é exibido como está. O texto final é sempre o original.
const NUMBER_PATTERN = /^(\D*?)(\d+(?:,\d+)?)(.*)$/s;

export function CountUpValue({ value, delay = 0.2 }: { value: string; delay?: number }) {
    const reducedMotion = useStore((s) => s.reducedMotion);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        const match = value.match(NUMBER_PATTERN);
        if (!el || !match || reducedMotion) {
            if (el) el.textContent = value;
            return;
        }

        const [, prefix, numberText, suffix] = match;
        const decimals = numberText.split(',')[1]?.length ?? 0;
        const target = parseFloat(numberText.replace(',', '.'));
        const counter = { n: 0 };
        const render = () => {
            el.textContent =
                prefix +
                counter.n.toLocaleString('pt-BR', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                }) +
                suffix;
        };

        render();
        const tween = gsap.to(counter, {
            n: target,
            duration: 1.2,
            delay,
            ease: 'power2.out',
            onUpdate: render,
            onComplete: () => {
                el.textContent = value;
            },
        });

        return () => {
            tween.kill();
        };
    }, [value, delay, reducedMotion]);

    // Leitor de tela lê só o valor final, não cada quadro da contagem.
    return (
        <>
            <span ref={ref} aria-hidden="true">
                {value}
            </span>
            <span className="sr-only">{value}</span>
        </>
    );
}
