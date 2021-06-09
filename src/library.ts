import { SessionEventCode, SolclientFactory } from 'solclientjs';
import config from './config';

export function myAdder(x: number, y: number): number {
  return x + y;
}

/**
 * Connects to Solace PubSub+ on Web, subscribes to prices topic
 * @param logger logging callback
 */
export function connect(log: (message: string) => void): void {
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
    log('Received message:' + m);
  });

  subscriber.on(SessionEventCode.SUBSCRIPTION_OK, function () {
    log('Subscription ok');
  });
}
