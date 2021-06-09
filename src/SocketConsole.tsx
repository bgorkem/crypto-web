import React, { ReactElement, useState } from 'react';
import { connect } from './library';

function SocketConsole(): ReactElement {
  const [logOutput, setLogOutput] = useState<string>('');

  const logger = (message: string) => {
    setLogOutput((currentLogOutput) => currentLogOutput + message + '\r');
  };

  return (
    <div data-testid="socket-console">
      <button onClick={() => connect(logger)} data-testid="connect-button">
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
