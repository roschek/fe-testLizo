import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import styles from './FiltersBar.module.css';

interface FiltersBarProps {
  states: string[];
  selectedStates: string[];
  onStatesChange: (next: string[]) => void;
  searchText: string;
  onSearchChange: (value: string) => void;
  selectedOnly: boolean;
  onToggleSelectedOnly: () => void;
}

export const FiltersBar = ({
  states,
  selectedStates,
  onStatesChange,
  searchText,
  onSearchChange,
  selectedOnly,
  onToggleSelectedOnly,
}: FiltersBarProps) => {
  const [open, setOpen] = useState(false);

  const toggleState = (state: string) => {
    onStatesChange(
      selectedStates.includes(state)
        ? selectedStates.filter((item) => item !== state)
        : [...selectedStates, state],
    );
  };

  const hasStates = states.length > 0;

  const stateColumns = useMemo(() => {
    const colCount = 3;
    const perCol = Math.ceil(states.length / colCount);
    return Array.from({ length: colCount }, (_, index) => states.slice(index * perCol, (index + 1) * perCol));
  }, [states]);

  return (
    <section className={styles.filters}>
      <div className={styles.filters__left}>
        <div className={styles.filters__title}>Filters</div>
        <div className={styles.filters__group}>
          <div className={styles.filters__label}>States</div>
          <div className={clsx(styles.filters__dropdown, open && styles['filters__dropdown--open'])}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {selectedStates.length > 0 ? `${selectedStates.length} selected` : 'Select states'}
            </Button>
            {open && (
              <div className={styles.filters__dropdownContent}>
                {hasStates ? (
                  <div className={styles.filters__grid}>
                    {stateColumns.map((col, colIndex) => (
                      <div key={colIndex} className={styles.filters__col}>
                        {col.map((state) => (
                          <Checkbox
                            key={state}
                            checked={selectedStates.includes(state)}
                            label={state}
                            onChange={() => toggleState(state)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.filters__empty}>No states found</div>
                )}
                <div className={styles.filters__actions}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onStatesChange([]);
                      setOpen(false);
                    }}
                  >
                    Clear
                  </Button>
                  <Button type="button" size="sm" onClick={() => setOpen(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.filters__right}>
        <div className={styles.filters__search}>
          <input
            type="text"
            placeholder="Filter by zip, city, state"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className={styles.filters__toggle}>
          <span className={styles.filters__label}>Selected only</span>
          <label className={styles.toggle}>
            <input type="checkbox" checked={selectedOnly} onChange={onToggleSelectedOnly} />
            <span className={styles.toggle__slider} />
          </label>
        </div>
      </div>
    </section>
  );
};

