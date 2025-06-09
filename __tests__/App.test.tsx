import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App.tsx';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});
