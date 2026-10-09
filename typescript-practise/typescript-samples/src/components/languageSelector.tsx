import { useLingui } from '@lingui/react'
import { locales, dynamicActivate } from '../i18n';

export function LanguageSelector() {
  const { i18n } = useLingui()

  return (
    <select 
      value={i18n.locale} 
      onChange={(e) => dynamicActivate(e.target?.value)}
    >
      {Object.entries(locales).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  )
}