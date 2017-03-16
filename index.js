const Restify = require('restify')

let server = Restify.createServer()

require('./routes')(server)

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running..')
})
