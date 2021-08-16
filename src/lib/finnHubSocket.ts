import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map, distinctUntilChanged, bufferTime, first } from 'rxjs/operators';

import finnHubConfig from './finnHubConfig';
import { IConnect } from '../types';
import { LoggerFactory } from 'ag-grid-community';

type SendData = { type: string; symbol: string };
type TickData = {
  data: {
    p: number;
    s: string;
    t: number;
    v: number;
  }[];
  type: string;
};

type SocketData = SendData | TickData;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasTickData(x: any): x is TickData {
  return x.data instanceof Object;
}

export const createWebSocketSubject = () =>
  webSocket<SocketData>(`wss://ws.finnhub.io?token=${finnHubConfig.apiKey}`);

// wsSubject.next({ type: 'subscribe', symbol: 'BINANCE:ETHUSDT' });
// wsSubject.next({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' });
// wsSubject.next({ type: 'subscribe', symbol: 'BINANCE:ETHEUR' });

function createConnection(
  wsSubject: WebSocketSubject<SocketData>,
  symbols: string[]
) {
  // subscribe to each symbol
  symbols.forEach((symbol) => wsSubject.next({ type: 'subscribe', symbol }));

  return {
    stream: wsSubject.pipe(
      bufferTime(1000),
      map((socketMessages) =>
        socketMessages.map((a) => (a as TickData).data).flat(1)
      ),
      distinctUntilChanged()
    ),
    close: () => wsSubject.complete(),
  };
}

export const connect: IConnect = (log, onPriceUpdate) => {
  log('connecting');

  const conn = createConnection(createWebSocketSubject(), [
    'BINANCE:ETHUSDT',
    'BINANCE:BTCUSDT',
    'BINANCE:ETHEUR',
  ]);

  // log the first time we get data..
  conn.stream.pipe(first()).subscribe(() => log('connected'));

  conn.stream.subscribe({
    next: (values) => {
      const priceEntities = values.map((value) => ({
        id: value.s,
        currency: value.s,
        symbol: value.s,
        price: value.p,
        price_timestamp: value.t.toString(),
      }));
      onPriceUpdate(priceEntities);
    },
    error: (err) => log(`error :  ${JSON.stringify(err)}`),
    complete: () => log('closed'),
  });

  return () => {
    log('disconnecting');
    conn.close();
  };
};
