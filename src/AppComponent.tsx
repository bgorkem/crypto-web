import React from 'react';
import Grid from './Grid';
import SocketConsole from './SocketConsole';

interface AppComponentType {
  (): React.ReactElement;
}

const AppComponent: AppComponentType = () => {
  return (
    <>
      <SocketConsole />
      <Grid />
    </>
  );
};

export default AppComponent;
