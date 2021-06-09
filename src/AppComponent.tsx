import React from 'react';
import SocketConsole from './SocketConsole';

interface AppComponentType {
  (): React.ReactElement;
}

const AppComponent: AppComponentType = () => {
  return <SocketConsole />;
};

export default AppComponent;
