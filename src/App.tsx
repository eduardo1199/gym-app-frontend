import './styles/global.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import { Router } from './Router'

import { store } from './app/store';

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </Provider>
  )
}