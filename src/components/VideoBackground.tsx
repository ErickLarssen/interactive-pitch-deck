import { useState } from 'react';
import { BeamsBackground } from './BeamsBackground';

interface VideoBackgroundProps {
    src: string;
    poster?: string;
    className?: string;
}

export function VideoBackground({ src, poster, className }: VideoBackgroundProps) {
    const [failed, setFailed] = useState(false);

    // Vídeo indisponível (arquivo ainda não adicionado, corrompido, ou
    // falha de decodificação): cai para o fundo animado local, que não
    // depende de nenhum arquivo externo. A apresentação nunca fica sem fundo.
    if (failed) {
        return <BeamsBackground className={className} intensity="medium" />;
    }

    return (
        <video
            className={`video-background ${className ?? ''}`}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setFailed(true)}
        />
    );
}