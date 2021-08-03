import React from 'react';
import Grid from '../Grid';
import { render } from '@testing-library/react';

describe('Grid tests', () => {
  test('Grid is rendered', async () => {
    const comp = await render(<Grid onGridApi={() => {}} />);
    const div = comp.getByTestId('grid');
    expect(div).not.toBeUndefined();
  });
});
