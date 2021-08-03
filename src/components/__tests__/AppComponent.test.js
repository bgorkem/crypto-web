import React from 'react';
import AppComponent from '../AppComponent';

import { render, waitFor, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('AppComponent test', () => {
  beforeEach(() => {
    render(<AppComponent />);
  });

  afterEach(() => {
    cleanup();
  });

  test('it should render the console', async () => {
    const socketConsole = await waitFor(() =>
      screen.getByTestId('socket-console')
    );
    expect(socketConsole).toBeInTheDocument();
  });
});
