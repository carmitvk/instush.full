const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addPosti, getPostis, deletePosti,getPosti,updatePosti} = require('./posti.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getPostis)
router.get('/:postiId', log, getPosti)
// router.post('/',  requireAuth, requireAdmin, addPosti)
router.post('/',  addPosti)
// router.post('/', requireAuth, addPosti)
router.put('/:postiId', updatePosti)

// router.delete('/:postiId',  requireAuth, requireAdmin, deletePosti)
router.delete('/:postiId', deletePosti)

module.exports = router