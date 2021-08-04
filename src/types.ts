export type PriceEntity = {
  id: string;
  currency: string;
  symbol: string;
  price: number;
  price_timestamp: string;
};

export interface IConnect {
  (
    log: (message: string) => void,
    onPriceUpdate: (prices: PriceEntity[]) => void
  ): void;
}
