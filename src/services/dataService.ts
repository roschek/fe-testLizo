import type { FitScoreData, TableChartPoint, ZipDataRecord } from '../types/data';

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить ${path}`);
  }
  return response.json();
};

export const loadZipRows = () => fetchJson<ZipDataRecord[]>('/data/table-lines-data.js');

export const loadFitScores = () => fetchJson<FitScoreData>('/data/fit-score.json');

export const loadChartPoints = () => fetchJson<{ zip_map: TableChartPoint[] }>('/data/table-chart-data.json');

