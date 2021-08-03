import React, { useState } from 'react';
import Grid from './Grid';
import SocketConsole from './SocketConsole';
import { PriceEntity } from '../types';
import { GridApi } from 'ag-grid-community';

interface AppComponentType {
  (): React.ReactElement;
}
const rows: PriceEntity[] = [];

const AppComponent: AppComponentType = () => {
  const [gridApi, setGridApi] = useState<GridApi>();

  /**
   * setPrices prop when socket receives new price updates
   * @param updates
   */
  const onPriceUpdate = (updates: PriceEntity[]) => {
    // update prices inside existing rows..
    updates.forEach((update) => {
      const matchingPriceEntity = rows.find((p) => p.id === update.id);
      if (matchingPriceEntity) {
        matchingPriceEntity.price = update.price;
        matchingPriceEntity.price_timestamp = update.price_timestamp;
      } else {
        rows.push(update);
      }
    });

    console.log('onprice update new rows: ', rows);

    gridApi?.setRowData(rows);
  };

  return (
    <>
      <SocketConsole onPriceUpdate={onPriceUpdate} />
      <Grid
        onGridApi={(api: GridApi) => {
          setGridApi(api);
        }}
      />
    </>
  );
};

export default AppComponent;
