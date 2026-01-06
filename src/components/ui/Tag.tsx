import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tag.module.css';
import { IconClose } from './icons/IconClose';

interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
  className?: string;
}

export const Tag = ({ children, onRemove, className }: TagProps) => (
  <span className={clsx(styles['ui-tag'], className)}>
    <span className={styles['ui-tag__label']}>{children}</span>
    {onRemove && (
      <button type="button" className={styles['ui-tag__remove']} onClick={onRemove} aria-label="Remove tag">
        <IconClose />
      </button>
    )}
  </span>
);

