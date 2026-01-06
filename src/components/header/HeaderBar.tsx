import { Button } from '../ui/Button';
import { IconArrow } from '../ui/icons/IconArrow';
import styles from './HeaderBar.module.css';

interface HeaderBarProps {
  segments: { label: string; value: string }[];
  activeSegment: string;
  onSegmentChange: (value: string) => void;
  levelStats: { states: number; msas: number; zips: number };
  mainKpiLabel: string;
  mainKpiValue: string;
  fitScoreValue: string;
  overallValue: string;
}

export const HeaderBar = ({
  segments,
  activeSegment,
  onSegmentChange,
  levelStats,
  mainKpiLabel,
  mainKpiValue,
  fitScoreValue,
  overallValue,
}: HeaderBarProps) => (
  <header className={styles.header}>
    <div className={styles.header__row}>
      <div className={styles.header__segments}>
        {segments.map((segment) => (
          <button
            key={segment.value}
            type="button"
            className={`${styles.segment} ${activeSegment === segment.value ? styles['segment--active'] : ''}`}
            onClick={() => onSegmentChange(segment.value)}
          >
            {segment.label}
          </button>
        ))}
      </div>
      <div className={styles.header__actions}>
        <Button variant="ghost" size="sm">
          Save
        </Button>
        <Button variant="primary" size="sm" iconRight={<IconArrow />}>
          Target List
        </Button>
      </div>
    </div>

    <div className={styles.header__middle}>
      <div className={styles.header__locations}>
        <span className={styles.location__label}>Location:</span>
        <span className={styles.location__pill}>States {levelStats.states}</span>
        <span className={styles.location__pill}>MSAs {levelStats.msas}</span>
        <span className={styles.location__pill}>Zip codes {levelStats.zips}</span>
      </div>

      <div className={styles.header__kpis}>
        <div className={styles.kpiChip}>
          <span className={styles.kpiChip__label}>Main KPI:</span>
          <span className={styles.kpiChip__value}>{mainKpiLabel}</span>
          <span className={styles.kpiChip__number}>{mainKpiValue}</span>
        </div>
        <div className={styles.kpiChip}>
          <span className={styles.kpiChip__label}>Fit Score:</span>
          <span className={styles.kpiChip__number}>{fitScoreValue}</span>
        </div>
        <div className={styles.kpiChip}>
          <span className={styles.kpiChip__label}>Overall:</span>
          <span className={styles.kpiChip__number}>{overallValue}</span>
        </div>
      </div>
    </div>
  </header>
);

