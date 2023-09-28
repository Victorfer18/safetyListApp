import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Loged } from './loged';
import { Unloged } from "./unloged";

export default function App() {
  const auth = false;

  return (
    <NavigationContainer>{auth ? <Loged /> : <Unloged />}</NavigationContainer>
  );
}