/* Other app initializations
  * @module app
*/

const redis = require('./redis');
const _cache = require('./cache');
const RedisStore = require('./RedisStore');


// reference to the promisfied redisClient
let redisClient;
let cache;

/** initRedis sets the redisClient variable
 * @private
 */
function initRedis() {
  redisClient = redis.getInstance();
}

/**
 * @private
 */
function initCache() {
  const redisStore = new RedisStore({redis: redisClient});
  cache = _cache({store: redisStore});
}

/** app object so init can be called
 */
const app = {
  init: () => {
    initRedis();
    initCache();
  },
};

module.exports = {app, redisClient, cache};
