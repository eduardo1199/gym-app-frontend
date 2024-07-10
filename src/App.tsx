import './styles/global.css'

import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

import { Router } from '@/Router'

import { store } from '@/app/store'
import { ViewPortProvider } from '@/context/ViewPortContext'

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <ViewPortProvider>
          <Router />
        </ViewPortProvider>
      </ChakraProvider>
    </Provider>
  )
}
