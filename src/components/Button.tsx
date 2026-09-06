import { ArrowRight } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'blue' | 'green' | 'ghost';
    icon?: boolean;
}

export function Button({
    children,
    variant = 'blue',
    icon = true,
    className,
    ...rest
}: ButtonProps) {
    const classes = ['pitch-button', `pitch-button--${variant}`, className]
        .filter(Boolean)
        .join(' ');

    return (
        <button type="button" className={classes} {...rest}>
            <span className="pitch-button__label">{children}</span>
            {icon && <ArrowRight className="pitch-button__icon" size={18} aria-hidden="true" />}
        </button>
    );
}