var env = process.env.MAIN

if (env === 'staging') {
  module.exports =  {
    NODE_ENV: '"production"',
    MAIN: '"staging"'
  }
} else {
  module.exports = {
    NODE_ENV: '"production"',
    MAIN: '"production"'
  }
}
