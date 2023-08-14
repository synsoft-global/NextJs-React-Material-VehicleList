const fs = require('fs')
const path = require('path')
const developmentConfig = require('./dev.json')
const productionConfig = require('./prod.json')
const stagingConfig = require('./staging.json')

const environment = process.env.NEXT_PUBLIC_APP_ENV || 'development'

let config = (() => {
  switch (environment) {
    case 'development': return developmentConfig
    case 'staging': return stagingConfig
    case 'production': return productionConfig
    default: return developmentConfig
  }
})()

const configFilePath = path.join(__dirname, 'config.json');
fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2))


console.log(
  `\x1b[32m--------------------------------------------------------------------------
    Configuration for ${environment} environment generated successfully!
--------------------------------------------------------------------------\x1b[0m`
);

