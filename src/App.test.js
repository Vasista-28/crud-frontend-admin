import { render, screen } from '@testing-library/react';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import App from './App';


test('renders without crashing', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/learn react/i)).toBeInTheDocument(); // Adjust this to match your app content
});
