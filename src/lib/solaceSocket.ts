import { IConnect, PriceEntity } from '../types';
import { SessionEventCode, SolclientFactory } from 'solclientjs';
import config from './solaceConfig';

/**
 * Connects to Solace PubSub+ on Web, subscribes to prices topic
 * @param logger logging callback
 */
export const connect: IConnect = (log, onPriceUpdate) => {
  SolclientFactory.init({});
  log('initialized');

  const subscriber = SolclientFactory.createSession(config);
  try {
    subscriber.connect();
  } catch (error) {
    log(error);
  }

  subscriber.on(SessionEventCode.UP_NOTICE, function () {
    log('connected, subscribing topic: T/Crypto/prices');
    const t = SolclientFactory.createTopicDestination('T/Crypto/prices');
    subscriber.subscribe(t, true, 'T/Crypto/prices');
  });

  subscriber.on(SessionEventCode.MESSAGE, function (message) {
    const m = message.getSdtContainer().getValue() || '';
    const tick = JSON.parse(m);
    const { id, currency, symbol, price, price_timestamp } = tick;
    onPriceUpdate([{ id, currency, symbol, price, price_timestamp }]);
    log('Received message:' + m);
  });

  subscriber.on(SessionEventCode.SUBSCRIPTION_OK, function () {
    log('Subscription ok');
  });
};
