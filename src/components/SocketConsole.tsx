import React, { ReactElement, useState } from 'react';
import { connect } from '../lib/socket';
import { PriceEntity } from '../types';

type SocketConsoleProps = {
  onPriceUpdate: (rows: PriceEntity[]) => void;
  onConnect?: () => void;
};

function SocketConsole(props: SocketConsoleProps): ReactElement {
  const [logOutput, setLogOutput] = useState<string>('');

  const logger = (message: string) => {
    setLogOutput((currentLogOutput) => currentLogOutput + message + '\r');
  };

  return (
    <div data-testid="socket-console">
      <button
        onClick={() => connect(logger, props.onPriceUpdate)}
        data-testid="connect-button"
      >
        Connect
      </button>
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
