import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = ({ label, className, ...rest }: CheckboxProps) => (
  <label className={clsx(styles['ui-checkbox'], className)}>
    <input type="checkbox" className={styles['ui-checkbox__input']} {...rest} />
    <span className={styles['ui-checkbox__box']} />
    {label && <span className={styles['ui-checkbox__label']}>{label}</span>}
  </label>
);

