const postiService = require('./posti.service')
const logger = require('../../services/logger.service')


async function getPostis(req, res) {
    try {
        const postis = await postiService.query()
        res.send(postis)
    } catch (err) {
        logger.error('Cannot get postis', err)
        res.status(500).send({ err: 'Failed to get postis' })
    }
}

async function getPosti(req, res) {
    try {
        const postiId = req.params.postiId
        const posti = await postiService.getById(postiId)
        res.send(posti)
    } catch (err) {
        logger.error('Cannot get posti' + postiId, err)
        res.status(500).send({ err: 'Failed to get posti' })
    }
}


async function addPosti(req, res) {
    try {
        // const { description, tags, imgUrl, comments, loc, likedBy, isSaved } = req.body
        // var posti = { description, tags, imgUrl, comments, loc, likedBy, isSaved }
        var posti = req.body
        posti.createdAt = Date.now()
        posti.creator = {}
        posti.creator._id = req.session.user?._id
        posti.creator.imgUrl = req.session.user?.imgUrl
        posti.creator.fullname = req.session.user?.fullname


        posti = await postiService.add(posti)
        res.send(posti)
    } catch (err) {
        logger.error('Failed to add posti', err)
        res.status(500).send({ err: 'Failed to add posti' })
    }
}


async function updatePosti(req, res) {//update
    try {
        // const { _id, description, tags, imgUrl } = req.body
        // const posti = { _id, description, tags, imgUrl }
        const posti = req.body

        savedPosti = await postiService.update(posti)
        res.send(savedPosti)
    } catch (err) {
        logger.error('Failed to update posti', err)
        res.status(500).send({ err: 'Failed to update posti' })
    }
}


async function deletePosti(req, res) {
    try {
        var posti = await postiService.getById(req.params.postiId);
        // if (req.session.user?._id !== posti.creator._id)
        // {
        //     console.log('only creator can delete post');
        //     res.send({ msg: 'Not authorized' }) 
        // }else{

            await postiService.remove(req.params.postiId)
            res.send({ msg: 'Deleted successfully' })
        // }
    } catch (err) {
        logger.error('Failed to delete posti', err)
        res.status(500).send({ err: 'Failed to delete posti' })
    }
}


module.exports = {
    getPostis,
    getPosti,
    updatePosti,
    addPosti,
    deletePosti,
}