import React, { ReactElement, useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ColDef, GridApi } from 'ag-grid-community';
import { PriceEntity } from '../types';

const colDefs: ColDef[] = [
  { headerName: 'Id', field: 'id', sortable: true, filter: true },
  { headerName: 'Symbol', field: 'symbol', sortable: true, filter: true },
  { headerName: 'Price', field: 'price', sortable: true, filter: true },
  {
    headerName: 'Time',
    field: 'price_timestamp',
    sortable: true,
    filter: true,
    width: 400,
  },
];

type GridProps = {
  onGridApi: (api: GridApi) => void;
};

const Grid = (props: GridProps): ReactElement => {
  const onGridReady = (params: { api: GridApi }) => {
    props.onGridApi(params.api);
  };

  return (
    <div
      data-testid="grid"
      className="ag-theme-alpine"
      style={{ height: 400, width: 1200 }}
    >
      <AgGridReact onGridReady={onGridReady} columnDefs={colDefs}></AgGridReact>
    </div>
  );
};

export default Grid;
