const Connector = require('../bot')

module.exports = (server) => {
  server.get('/', require('./home')(Connector))
  server.post('/api/messages', require('./api/messages')(Connector))
}
