const express = require('express')
const handleEvent = require('../controller/handleEvent')

const router = express.Router()

router.get('/', handleEvent.echo)

router.post('/', handleEvent.msg)

module.exports = router
