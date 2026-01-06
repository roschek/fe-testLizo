import type { KpiSummary } from '../../types/data';
import { formatPercent, formatNumber } from '../../utils/format';
import styles from './KpiCards.module.css';

interface KpiCardsProps {
  summary: KpiSummary;
}

export const KpiCards = ({ summary }: KpiCardsProps) => (
  <section className={styles['kpi-cards']}>
    <article className={styles['kpi-card']}>
      <span className={styles['kpi-card__label']}>Rent Growth Avg</span>
      <span className={styles['kpi-card__value']}>{formatPercent(summary.rentGrowthAvg)}</span>
    </article>
    <article className={styles['kpi-card']}>
      <span className={styles['kpi-card__label']}>Fit Score</span>
      <span className={styles['kpi-card__value']}>{formatNumber(summary.fitScoreOverall, 1)}</span>
    </article>
    <article className={styles['kpi-card']}>
      <span className={styles['kpi-card__label']}>Overall</span>
      <span className={styles['kpi-card__value']}>{formatNumber(summary.overall, 1)}</span>
    </article>
  </section>
);

