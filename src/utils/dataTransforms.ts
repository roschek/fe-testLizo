import type { KpiSummary, FitScoreData, TableChartPoint, TableRow, ZipDataRecord } from '../types/data';

const fitScoreMap = (fitScores: FitScoreData): Record<string, number> =>
  fitScores.f_scores.reduce<Record<string, number>>((acc, item) => {
    acc[item.zip_code] = item.fit_score;
    return acc;
  }, {});

export const mergeFitScores = (rows: ZipDataRecord[], fitScores: FitScoreData): TableRow[] => {
  const map = fitScoreMap(fitScores);
  return rows.map<TableRow>((row) => ({
    ...row,
    fit_score: map[row.zip_code] ?? null,
  }));
};

export const calcKpis = (rows: TableRow[], fitScores: FitScoreData): KpiSummary => {
  const rentGrowthAvg =
    rows.length === 0 ? 0 : rows.reduce((acc, row) => acc + row.rent_growth, 0) / rows.length;

  return {
    rentGrowthAvg,
    fitScoreOverall: fitScores.fit_score_overall,
    overall: fitScores.fit_score_overall,
  };
};

export const filterChartPoints = (
  points: TableChartPoint[],
  selectedZips: string[],
): TableChartPoint[] => {
  const selected = new Set(selectedZips);
  return points.filter((item) => selected.has(item.zip_code));
};

export const uniqueStates = (rows: ZipDataRecord[]): string[] => {
  const set = new Set(rows.map((row) => row.state));
  return Array.from(set).sort();
};

