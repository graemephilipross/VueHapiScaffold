// pm2 start ecosystem.config.js --env production

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // application
    {
      name      : 'app1',
      script    : 'server/index.js',
      watch     : false,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3001'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3001'
      }
    },
    {
      name      : 'app2',
      script    : 'server/index.js',
      watch     : false,
      env       : {
        NODE_ENV: 'development',
        NODE_PORT: '3002'
      },
      env_production : {
        NODE_ENV: 'production',
        NODE_PORT: '3002'
      }
    }
  ]
}
