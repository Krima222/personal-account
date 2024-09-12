import { MantineProvider } from '@mantine/core'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './components/App.tsx'

import './index.css'
import '@mantine/core/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)
