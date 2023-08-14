import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import config from '@/config'


const resources = {
  en: { translations: require('./en.json') },
  fr: { translations: require('./fr.json') },
}

i18n.use(initReactI18next).init({
  resources: resources,
  lng: config.defaultLanugage,
  ns: ['translations'],
  defaultNS: 'translations',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.languages = config.supportedLanguages.map(item => item?.code)
export default i18n