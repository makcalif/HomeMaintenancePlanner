const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/server').listen(3000, () => {
  logger.success('Server is running at http://localhost:3000')
})
