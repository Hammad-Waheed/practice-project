const redisService = require('../services/redisService');

const getRedisValue = async (req, res) => {
    const key = req.params.key;

    try {
        const value = await redisService.getValue(key);
        if (value) {
            res.json({ key, value });
        } else {
            res.status(404).json({ error: 'Key not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// New endpoint to get the latest 2 objects
const getLatestObjects = async (req, res) => {
    console.log('latest');
    try {
        const keys = await redisService.getLatestKeys(2); // Fetch the latest 2 keys
        const values = await Promise.all(keys.map(key => redisService.getValue(key)));

        res.json(values);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// controllers/redisController.js

const getLatestSettleObjects = async (req, res) => {
    try {
        const settleObjects = await redisService.getLatestSettleObjects();
        res.json(settleObjects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getRedisValue,
    getLatestObjects,
    getLatestSettleObjects
};