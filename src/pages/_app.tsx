import { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import '../styles/global.css';
import { store } from '../app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
