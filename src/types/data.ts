export interface ZipDataRecord {
  zip_code: string;
  city: string;
  state: string;
  rent_growth: number;
  appreciation: number;
  cap_rate: number;
  total_population: number;
  population_growth: number;
  migration_trend: number;
  persons_per_household: number;
  median_household_income: number;
  share_of_renters: number;
  median_age: number;
  graduate_degree_percent: number;
  occupancy_rate_kpi: number;
  median_rent: number;
  rent_to_income_ratio: number;
  employment_rate: number;
  median_house_value: number;
  violent_crime_rate: number;
  mfh_units_per_1000_residents: number;
  average_age_of_mfh: number;
  percent_of_mfh_under_5_years: number;
  density: number;
  supply_vs_demand: number;
  scarcity_index: number;
  construction_start: number;
  median_gross_yield: number;
  white_pct: number;
  black_pct: number;
  asian_pct: number;
  latino_pct: number;
  population_growth_t: string | null;
  migration_trend_t: string | null;
  median_age_t: string | null;
  graduate_degree_percent_t: string | null;
  employment_rate_t: string | null;
  violent_crime_rate_t: string | null;
  mfh_units_per_1000_residents_t: string | null;
  average_age_of_mfh_t: string | null;
  percent_of_mfh_under_5_years_t: string | null;
  density_t: string | null;
  scarcity_index_t: string | null;
  construction_start_t: string | null;
  average_age_of_buildings_t: string | null;
  rent_growth_t: string | null;
  appreciation_t: string | null;
  cap_rate_t: string | null;
  average_school_score_t: number | null;
  persons_per_household_t: string | null;
  median_household_income_t: string | null;
  share_of_renters_t: string | null;
  occupancy_rate_kpi_t: string | null;
  median_rent_t: string | null;
  rent_to_income_ratio_t: string | null;
  median_house_value_t: string | null;
  supply_vs_demand_t: string | null;
}

export interface FitScoreEntry {
  zip_code: string;
  fit_score: number;
}

export interface FitScoreData {
  fit_score_overall: number;
  f_scores: FitScoreEntry[];
}

export interface TableChartPoint {
  zip_code: string;
  state: string;
  city: string;
  rent_growth: number;
  appreciation: number;
  cap_rate: number;
}

export interface TableRow extends ZipDataRecord {
  fit_score: number | null;
}

export interface KpiSummary {
  rentGrowthAvg: number;
  fitScoreOverall: number;
  overall: number;
}

export type ChartValueKey =
  | 'rent_growth'
  | 'appreciation'
  | 'cap_rate'
  | 'median_rent'
  | 'population_growth'
  | 'occupancy_rate_kpi'
  | 'percent_of_mfh_under_5_years'
  | 'total_population';

