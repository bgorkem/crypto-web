import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { map, distinctUntilChanged, bufferTime } from 'rxjs/operators';

import finnHubConfig from './finnHubConfig';
import { IConnect } from '../types';

type SendData = { type: string; symbol: string };
type ReceiveData = {
  data: {
    p: number;
    s: string;
    t: number;
    v: number;
  }[];
  type: string;
};

type SocketData = SendData | ReceiveData;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isReceiveData(x: any): x is ReceiveData {
  return x.data instanceof Object;
}
/**
 * Create an return a websocket subject where you can subscribe to a topic and observe incoming messages.
 * @returns WebSocket subject
 */
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
      map((arrays) => arrays.map((a) => (a as ReceiveData).data).flat(1)),
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

  conn.stream.subscribe((values) => {
    const priceEntities = values.map((value) => ({
      id: value.s,
      currency: value.s,
      symbol: value.s,
      price: value.p,
      price_timestamp: value.t.toString(),
    }));

    onPriceUpdate(priceEntities);
  });
};
