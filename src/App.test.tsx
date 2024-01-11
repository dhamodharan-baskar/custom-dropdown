import { render, screen } from '@testing-library/react';
import App from './App';
import { Fragment } from "react";

test('renders dropdown with search', () => {
  render(<App />);
  const linkElement = screen.getByText(/Drodown with search/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dropdown with autocompleted', () => {
  render(<App />);
  const linkElement = screen.getByText(/Drodown with api search/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dropdown without clear', () => {
  render(<App />);
  const linkElement = screen.getByText(/Drodown without clear/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders dropdown with just options', () => {
  render(<App />);
  const linkElement = screen.getByText(/Drodown without search/i);
  expect(linkElement).toBeInTheDocument();
});

test('matches the snapshot', () => {
  render(<App />);
  expect(Fragment).toMatchSnapshot();
});
