import React, { ReactElement, useState } from 'react';
import { connect } from '../lib/finnHubSocket';
import { PriceEntity } from '../types';

type SocketConsoleProps = {
  onPriceUpdate: (rows: PriceEntity[]) => void;
  onConnecting?: () => void;
};

function SocketConsole(props: SocketConsoleProps): ReactElement {
  const [logOutput, setLogOutput] = useState<string>('');

  const [subscription, setSubscription] = useState<{
    disconnect: () => void;
  } | null>(null);

  const logger = (message: string) => {
    setLogOutput((currentLogOutput) => currentLogOutput + message + '\r');
  };

  return (
    <div data-testid="socket-console">
      <button
        onClick={() => {
          props.onConnecting && props.onConnecting();
          const disconnect = connect(logger, props.onPriceUpdate);
          setSubscription({ disconnect });
        }}
        data-testid="connect-button"
      >
        Connect
      </button>
      {subscription && (
        <button
          onClick={() => {
            subscription.disconnect();
            setSubscription(null);
          }}
          data-testid="disconnect-button"
        >
          Disconnect
        </button>
      )}

      <br />
      <textarea
        readOnly
        rows={8}
        value={logOutput}
        style={{ width: '100em' }}
        data-testid="log-area"
      ></textarea>
    </div>
  );
}

export default SocketConsole;
