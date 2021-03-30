const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const POSTI_COLLECTION = 'posti'

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection(POSTI_COLLECTION)
        var postis = await collection.find().toArray()
        return postis
    } catch (err) {
        logger.error('cannot find postis', err)
        throw err
    }
}

async function getById(postiId) {
    try {
        const collection = await dbService.getCollection(POSTI_COLLECTION)
        const posti = await collection.aggregate([
            {
                $match: { '_id': ObjectId(postiId) }
            },
            {
                $addFields: {
                    stringId: {
                        $toObjectId: "$_id"
                    }
                }
            },  
        ]).toArray()
        // const posti = await collection.findOne({ '_id': ObjectId(postiId) })
        return posti[0]
    } catch (err) {
        logger.error(`while finding posti ${postiId}`, err)
        throw err
    }
}

async function remove(postiId) {
    try {
        const collection = await dbService.getCollection(POSTI_COLLECTION)
        await collection.deleteOne({ '_id': ObjectId(postiId) })
    } catch (err) {
        logger.error(`cannot remove posti ${postiId}`, err)
        throw err
    }
}

async function update(posti) {
    try {
        // peek only updatable fields!
        posti._id = ObjectId(posti._id);//TODO verify if fields with uppercase is ok
        const postiToSave = { ...posti }
        const collection = await dbService.getCollection(POSTI_COLLECTION)
        await collection.updateOne({ '_id': postiToSave._id }, { $set: postiToSave })
        return postiToSave;
    } catch (err) {
        logger.error(`cannot update posti ${posti._id}`, err)
        throw err
    }
}

async function add(posti) {
    try {
        const postiToAdd = { ...posti };
        const collection = await dbService.getCollection(POSTI_COLLECTION)
        await collection.insertOne(postiToAdd)
        return postiToAdd
    } catch (err) {
        logger.error('cannot insert posti', err)
        throw err
    }
}
