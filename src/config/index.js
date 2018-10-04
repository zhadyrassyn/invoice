let conf = null

switch (process.env.NODE_ENV) {
  default:
    conf = require('./local')
    break
}

export default conf.default;
