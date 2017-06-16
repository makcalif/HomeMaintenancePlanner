const logger = require('../lib/logger')

logger.info('Starting server...')
require('../../server/server').listen(6000, () => {
  logger.success('Server is running at http://localhost:6000')
})
