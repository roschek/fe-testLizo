import { useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';
import type { ColDef, GridApi, GridReadyEvent, RowSelectionOptions } from 'ag-grid-community';
import type { TableRow } from '../../types/data';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/format';
import styles from './DataTable.module.css';

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataTableProps {
  rows: TableRow[];
  selectedZips: string[];
  onSelectionChange: (zips: string[]) => void;
  searchText: string;
  onSearchChange: (value: string) => void;
  selectedOnly: boolean;
  onToggleSelectedOnly: () => void;
}

export const DataTable = ({
  rows,
  selectedZips,
  onSelectionChange,
  searchText,
  onSearchChange,
  selectedOnly,
  onToggleSelectedOnly,
}: DataTableProps) => {
  const gridApiRef = useRef<GridApi | null>(null);

  const columnDefs = useMemo<ColDef<TableRow>[]>(() => {
    const percentFormatter = ({ value }: { value: number }) => formatPercent(value);

    const currencyFormatter = ({ value }: { value: number }) => formatCurrency(value);

    const numberFormatter =
      (digits = 2) =>
      ({ value }: { value: number }) =>
        formatNumber(value, digits);

    return [
      {
        headerName: 'Zip Code',
        field: 'zip_code',
        minWidth: 110,
      },
      { headerName: 'City', field: 'city', minWidth: 130 },
      { headerName: 'State', field: 'state', width: 90 },
      { headerName: 'Fit Score', field: 'fit_score', valueFormatter: numberFormatter(2), minWidth: 110 },
      { headerName: 'Rent Growth (%)', field: 'rent_growth', valueFormatter: percentFormatter, minWidth: 150 },
      { headerName: 'Median Home Value ($)', field: 'median_house_value', valueFormatter: currencyFormatter, minWidth: 190 },
      { headerName: 'Occupancy Rate (%)', field: 'occupancy_rate_kpi', valueFormatter: percentFormatter, minWidth: 170 },
      { headerName: 'Median Rent ($)', field: 'median_rent', valueFormatter: currencyFormatter, minWidth: 150 },
      { headerName: 'Cap Rate (%)', field: 'cap_rate', valueFormatter: percentFormatter, minWidth: 140 },
      { headerName: 'Rent to Income Ratio (%)', field: 'rent_to_income_ratio', valueFormatter: percentFormatter, minWidth: 200 },
      { headerName: 'Migration Trend (%)', field: 'migration_trend', valueFormatter: percentFormatter, minWidth: 160 },
      { headerName: 'Scarcity Index', field: 'scarcity_index', valueFormatter: numberFormatter(2), minWidth: 130 },
      { headerName: 'Construction Start (#)', field: 'construction_start', valueFormatter: numberFormatter(0), minWidth: 180 },
    ];
  }, []);

  const handleGridReady = (event: GridReadyEvent<TableRow>) => {
    gridApiRef.current = event.api;
    event.api.sizeColumnsToFit();
  };

  const handleSelectionChange = () => {
    const api = gridApiRef.current;
    if (!api) return;
    const selected = api.getSelectedRows().map((row) => row.zip_code);
    onSelectionChange(selected);
  };

  useEffect(() => {
    const api = gridApiRef.current;
    if (!api) return;
    const selected = new Set(selectedZips);
    api.forEachNode((node) => {
      node.setSelected(selected.has(node.data?.zip_code ?? ''));
    });
  }, [selectedZips]);

  const rowSelection: RowSelectionOptions = {
    mode: 'multiRow',
    headerCheckbox: true,
    checkboxes: true,
    enableClickSelection: false,
    selectAll: 'all',
  };

  const gridTheme = useMemo(
    () =>
      themeQuartz        
        .withParams({
          headerHeight: '42px',
          headerBackgroundColor: '#f5f6fa',
          headerTextColor: '#060607',
          selectedRowBackgroundColor: '#e8f0ff',
          rowHoverColor: '#f7f9ff',
          checkboxCheckedBackgroundColor: '#1f1f1f',
          checkboxUncheckedBackgroundColor: '#ffffff',
        }),
    [],
  );

  return (
    <section className={styles['data-table']}>
      <div className={styles['data-table__toolbar']}>
        <div className={styles['data-table__title']}>
          Zip Codes ({selectedZips.length} of {rows.length})
        </div>
        <div className={styles['data-table__controls']}>
          <input
            className={styles['data-table__search']}
            placeholder="Filter by zip, city, state"
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <div className={styles['data-table__toggle']}>
            <span>Selected only</span>
            <label className={styles.toggle}>
              <input type="checkbox" checked={selectedOnly} onChange={onToggleSelectedOnly} />
              <span className={styles.toggle__slider} />
            </label>
          </div>
        </div>
      </div>
      <div className={styles['data-table__grid']}>
        <AgGridReact<TableRow>
          theme={gridTheme}
          rowData={rows}
          columnDefs={columnDefs}
          rowSelection={rowSelection}
          rowHeight={40}
          headerHeight={38}
          onGridReady={handleGridReady}
          onSelectionChanged={handleSelectionChange}
          getRowId={(params) => params.data.zip_code}
          rowClassRules={{
            [styles['data-table__row--selected']]: (params) => !!params.node.isSelected(),
          }}
          defaultColDef={{
            sortable: true,
            filter: false,
            resizable: true,
          }}
        />
      </div>
    </section>
  );
};

