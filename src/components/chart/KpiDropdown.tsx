import { useMemo, useState } from 'react';
import clsx from 'clsx';
import styles from './KpiDropdown.module.css';

interface Option {
  value: string;
  label: string;
}

interface KpiDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const KpiDropdown = ({ value, options, onChange }: KpiDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = options.find((o) => o.value === value) ?? options[0];

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {selected?.label}
        <span className={styles.caret}>▾</span>
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>Select KPI</div>
          <div className={styles.searchRow}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="Search by KPI name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={styles.list}>
            {filtered.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={clsx(styles.option, opt.value === value && styles.optionActive)}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
            {filtered.length === 0 && <div className={styles.empty}>No results</div>}
          </div>
        </div>
      )}
    </div>
  );
};

