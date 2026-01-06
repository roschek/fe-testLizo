import { useEffect, useMemo, useState } from 'react';
import styles from './App.module.css';
import { HeaderBar } from './components/header/HeaderBar';
import { DataTable } from './components/table/DataTable';
import { ChartPanel, type ChartMetric } from './components/chart/ChartPanel';
import { TagsBar } from './components/tags/TagsBar';
import { KpiCards } from './components/kpi/KpiCards';
import { calcKpis, mergeFitScores } from './utils/dataTransforms';
import { loadFitScores, loadZipRows } from './services/dataService';
import type { FitScoreData, TableRow, ZipDataRecord } from './types/data';

function App() {
  const [rawRows, setRawRows] = useState<ZipDataRecord[]>([]);
  const [fitScores, setFitScores] = useState<FitScoreData | null>(null);
  const [selectedZips, setSelectedZips] = useState<string[]>([]);
  const [selectedKpi, setSelectedKpi] = useState<ChartMetric>('appreciation');
  const [searchText, setSearchText] = useState('');
  const [selectedOnly, setSelectedOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [rowsData, fitScoreData] = await Promise.all([loadZipRows(), loadFitScores()]);
        setRawRows(rowsData);
        setFitScores(fitScoreData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const tableRows: TableRow[] = useMemo(() => {
    if (!fitScores) return [];
    return mergeFitScores(rawRows, fitScores);
  }, [rawRows, fitScores]);

  const kpis = useMemo(() => (fitScores ? calcKpis(tableRows, fitScores) : null), [tableRows, fitScores]);

  const filteredRows: TableRow[] = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    const base = selectedOnly
      ? tableRows.filter((row) => selectedZips.includes(row.zip_code))
      : tableRows;

    if (!query) return base;

    return base.filter((row) => {
      const haystack = `${row.zip_code} ${row.city} ${row.state}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [tableRows, searchText, selectedOnly, selectedZips]);

  const levelStats = useMemo(
    () => ({
      states: new Set(rawRows.map((r) => r.state)).size,
      msas: 0,
      zips: rawRows.length,
    }),
    [rawRows],
  );

  const segments = [
    { label: 'Raw Data', value: 'raw' },
    { label: 'seg-list-105 zips', value: 'seg105' },
    { label: 'seg-list-71', value: 'seg71' },
    { label: 'seg-list-01 all', value: 'segAll' },
  ];

  const tags = useMemo(
    () => selectedZips.map((zip) => ({ label: `ZIP: ${zip}`, value: zip })),
    [selectedZips],
  );

  if (loading) {
    return <div className={styles['dashboard__loader']}>Loading data...</div>;
  }

  if (error || !fitScores) {
    return <div className={styles['dashboard__error']}>Error: {error ?? 'no data'}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__inner}>
        <HeaderBar
          segments={segments}
          activeSegment={segments[0].value}
          onSegmentChange={() => undefined}
          levelStats={levelStats}
          mainKpiLabel="Rent Growth Average"
          mainKpiValue={`${kpis?.rentGrowthAvg.toFixed(2)}%`}
          fitScoreValue={kpis ? kpis.fitScoreOverall.toFixed(1) : ''}
          overallValue={kpis ? kpis.overall.toFixed(1) : ''}
        />
        {kpis && <KpiCards summary={kpis} />}
        <TagsBar tags={tags} onRemove={(value) => setSelectedZips((prev) => prev.filter((z) => z !== value))} onClear={() => setSelectedZips([])} />

        <section className={styles.dashboard__row}>
          <ChartPanel rows={tableRows} selectedZips={selectedZips} selectedKpi={selectedKpi} onChangeKpi={setSelectedKpi} />
        </section>

        <section className={styles.dashboard__row}>
          <DataTable
            rows={filteredRows}
            selectedZips={selectedZips}
            onSelectionChange={setSelectedZips}
            searchText={searchText}
            onSearchChange={setSearchText}
            selectedOnly={selectedOnly}
            onToggleSelectedOnly={() => setSelectedOnly((v) => !v)}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
