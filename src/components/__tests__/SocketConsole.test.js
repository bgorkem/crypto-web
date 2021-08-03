import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SocketConsole from '../SocketConsole';

describe('SocketConsole test', () => {
  let component = null;

  beforeEach(async () => {
    component = await render(<SocketConsole />);
  });

  afterEach(() => {
    cleanup();
  });

  test('it should render an empty log area', async () => {
    const logArea = await waitFor(() => component.getByTestId('log-area'));
    expect(logArea).toBeInTheDocument();
    expect(logArea).toBeEmptyDOMElement();
  });

  test('it should render the connect button', async () => {
    const button = await waitFor(() => component.getByTestId('connect-button'));
    expect(button).toBeInTheDocument();
  });
});
