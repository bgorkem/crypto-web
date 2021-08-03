import React from 'react';
import AppComponent from './components/AppComponent';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
      <AppComponent />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
