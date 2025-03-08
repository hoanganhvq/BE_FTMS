const redis = require('redis');

const redisClient = redis.createClient({
    url:'redis://localhost:6379'  
});

redisClient.on('error', (err) => console.log('Redis Error:', err));

(async () => {
    await redisClient.connect();
    console.log('Connected to Redis');
})();

module.exports = redisClient;
