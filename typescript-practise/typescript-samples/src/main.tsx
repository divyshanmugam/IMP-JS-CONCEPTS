import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { dynamicActivate, defaultLocale } from '../src/i18n';
import './index.css'
import App from './App.tsx'

function Root() {
  // Activate default language on mount
  useEffect(() => {
    dynamicActivate(defaultLocale)
  }, [])

  return (
    <I18nProvider i18n={i18n as any}>
      <App />
    </I18nProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
