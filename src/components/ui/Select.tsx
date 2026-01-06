import type { ChangeEvent } from 'react';
import styles from './Select.module.css';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const Select = ({ label, value, options, onChange }: SelectProps) => (
  <div className={styles.select}>
    {label && <div className={styles.select__label}>{label}</div>}
    <select
      className={styles.select__native}
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

