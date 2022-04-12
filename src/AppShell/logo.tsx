import React from 'react';
import { ColorScheme } from '@mantine/core';
import logo from './logo.svg'

export function Logo({ colorScheme }: { colorScheme: ColorScheme }) {
  return (
    <img
    src={logo}
    alt="triangle with all three sides equal"
    height="40"
    width="auto" />
  );
}
