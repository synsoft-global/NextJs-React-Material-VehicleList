import developmentConfig from './dev.json'
import productionConfig from './prod.json'
import stagingConfig from './staging.json'

let config = (() => {
  switch (process.env.NEXT_PUBLIC_APP_ENV) {
    case 'development': return developmentConfig
    case 'staging': return stagingConfig
    case 'production': return productionConfig
    default: return developmentConfig
  }
})()

export default config