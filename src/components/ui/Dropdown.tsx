import clsx from 'clsx';
import styles from './Dropdown.module.css';

interface DropdownOption<T extends string = string> {
  label: string;
  value: T;
}

interface DropdownProps<T extends string = string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  label?: string;
  className?: string;
}

export const Dropdown = <T extends string>({
  value,
  options,
  onChange,
  label,
  className,
}: DropdownProps<T>) => (
  <label className={clsx(styles['ui-dropdown'], className)}>
    {label && <span className={styles['ui-dropdown__label']}>{label}</span>}
    <select
      className={styles['ui-dropdown__select']}
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

