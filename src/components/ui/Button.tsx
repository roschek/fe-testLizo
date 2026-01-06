import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  className,
  ...rest
}: ButtonProps) => (
  <button
    className={clsx(styles['ui-button'], styles[`ui-button--${variant}`], styles[`ui-button--${size}`], className)}
    {...rest}
  >
    {iconLeft && <span className={styles['ui-button__icon']}>{iconLeft}</span>}
    <span className={styles['ui-button__label']}>{children}</span>
    {iconRight && <span className={styles['ui-button__icon']}>{iconRight}</span>}
  </button>
);

