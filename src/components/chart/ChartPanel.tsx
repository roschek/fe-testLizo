import { ResponsiveContainer, Scatter, ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { Formatter } from 'recharts/types/component/DefaultTooltipContent';
import type { ScatterProps } from 'recharts';
import type { ChartValueKey, TableRow } from '../../types/data';
import { KpiDropdown } from './KpiDropdown';
import styles from './ChartPanel.module.css';

export type ChartMetric = 'rent_growth' | 'appreciation' | 'cap_rate' | 'population_growth' | 'total_population';

const KPI_OPTIONS: { value: ChartMetric; label: string }[] = [
  { value: 'rent_growth', label: 'Rent Growth (%)' },
  { value: 'appreciation', label: 'Appreciation (%)' },
  { value: 'cap_rate', label: 'Cap Rate (%)' },
  { value: 'population_growth', label: 'Population Growth (%)' },
  { value: 'total_population', label: 'Total Population (#)' },
];

interface ChartPanelProps {
  rows: TableRow[];
  selectedZips: string[];
  selectedKpi: ChartMetric;
  onChangeKpi: (metric: ChartMetric) => void;
}

const LEFT_X_KEY: ChartValueKey = 'rent_growth';
const RIGHT_X_KEY: ChartValueKey = 'percent_of_mfh_under_5_years';
const RIGHT_Y_KEY: ChartValueKey = 'occupancy_rate_kpi';

const labelMap: Record<ChartValueKey, string> = {
  rent_growth: 'Rent Growth (%)',
  appreciation: 'Appreciation (%)',
  cap_rate: 'Cap Rate (%)',
  median_rent: 'Median Rent ($)',
  population_growth: 'Population Growth (%)',
  occupancy_rate_kpi: 'Occupancy Rate (%)',
  percent_of_mfh_under_5_years: 'Share of MFH under 5 years (%)',
  total_population: 'Total Population (#)',
};

const isPercent = (key: ChartValueKey) =>
  key === 'rent_growth' ||
  key === 'appreciation' ||
  key === 'cap_rate' ||
  key === 'population_growth' ||
  key === 'occupancy_rate_kpi' ||
  key === 'percent_of_mfh_under_5_years';

const isCurrency = (key: ChartValueKey) => key === 'median_rent';
const isCount = (key: ChartValueKey) => key === 'total_population';

const formatValue = (key: ChartValueKey, value: number) => {
  if (Number.isNaN(value)) return '—';
  if (isPercent(key)) return `${value.toFixed(2)}%`;
  if (isCount(key)) return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (isCurrency(key)) return `$${Math.round(value).toLocaleString('en-US')}`;
  return value.toFixed(2);
};

const toPoints = (rows: TableRow[], selectedZips: string[]) => {
  const selected = new Set(selectedZips);
  return rows.filter((row) => selected.has(row.zip_code));
};

export const ChartPanel = ({ rows, selectedZips, selectedKpi, onChangeKpi }: ChartPanelProps) => {
  const selectedPoints = toPoints(rows, selectedZips);
  const hasSelection = selectedPoints.length > 0;
  const tooltipFormatter: Formatter<string | number, string> = (value) =>
    typeof value === 'number' ? value.toFixed(2) : value;
  const renderDot: ScatterProps['shape'] = (props: { cx?: number; cy?: number }) => {
    const { cx, cy } = props;
    if (cx === undefined || cy === undefined) return <g />;
    return <circle cx={cx} cy={cy} r={4} fill="#1f1f1f" stroke="#ffffff" strokeWidth={1} />;
  };

  return (
    <section className={styles['chart-panel']}>
      <div className={styles['chart-panel__header']}>
        <div className={styles['chart-panel__title']}>Scatter Plots</div>
      </div>

      <div className={styles['chart-panel__content']}>
        <div className={styles['chart-panel__chart']}>
          <div className={styles['chart-panel__chartControls']}>
            <span className={styles['chart-panel__axisLabel']}>Rent Growth (%)</span>
            <KpiDropdown value={selectedKpi} options={KPI_OPTIONS} onChange={(val) => onChangeKpi(val as ChartMetric)} />
          </div>
          <h4 className={styles['chart-panel__chartTitle']}>Rent Growth vs Selected KPI</h4>
          {hasSelection ? (
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={LEFT_X_KEY}
                  type="number"
                  name={labelMap[LEFT_X_KEY]}
                  tickFormatter={(value?: number) =>
                    value === undefined ? '' : formatValue(LEFT_X_KEY, value)
                  }
                />
                <YAxis
                  dataKey={selectedKpi}
                  type="number"
                  name={KPI_OPTIONS.find((o) => o.value === selectedKpi)?.label ?? ''}
                  tickFormatter={(value?: number) =>
                    value === undefined ? '' : formatValue(selectedKpi as ChartValueKey, value)
                  }
                />
                <Tooltip formatter={tooltipFormatter} />
                <Scatter data={selectedPoints} name="Selected ZIPs" fill="#1f1f1f" shape={renderDot} />
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <div className={styles['chart-panel__empty']}>Select ZIP codes in the table to see data.</div>
          )}
        </div>

        <div className={styles['chart-panel__chart']}>
          <div className={styles['chart-panel__chartControls']}>
            <span className={styles['chart-panel__axisLabel']}>Occupancy Rate (%)</span>
            <span className={styles['chart-panel__axisLabel']}>Share of MFH under 5 years (%)</span>
          </div>
          <h4 className={styles['chart-panel__chartTitle']}>Occupancy vs Share of MFH under 5 years</h4>
          {hasSelection ? (
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={RIGHT_X_KEY}
                  type="number"
                  name={labelMap[RIGHT_X_KEY]}
                  tickFormatter={(value?: number) =>
                    value === undefined ? '' : formatValue(RIGHT_X_KEY, value)
                  }
                />
                <YAxis
                  dataKey={RIGHT_Y_KEY}
                  type="number"
                  name={labelMap[RIGHT_Y_KEY]}
                  tickFormatter={(value?: number) =>
                    value === undefined ? '' : formatValue(RIGHT_Y_KEY, value)
                  }
                />
                <Tooltip formatter={tooltipFormatter} />
                <Scatter data={selectedPoints} name="Selected ZIPs" fill="#1f1f1f" shape={renderDot} />
                <Legend />
              </ScatterChart>
            </ResponsiveContainer>
          ) : (
            <div className={styles['chart-panel__empty']}>Select ZIP codes in the table to see data.</div>
          )}
        </div>
      </div>
    </section>
  );
};

