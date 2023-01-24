import { AppProps } from 'next/app';

import Head from 'next/head'

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import '../styles/global.css';
import { store } from '../app/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>GymApp</title>
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
