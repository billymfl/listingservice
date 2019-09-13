/* Other app initializations
  * @module app
*/

const Redis = require('./RedisClient');
const _Cache = require('./Cache');

// reference to the promisfied redisClient
let redisClient;
let Cache;

/** initRedis sets the redisClient variable
 * @private
 */
function initRedis() {
  redisClient = Redis.getInstance();
}

/**
 * @private
 */
function initCache() {
  Cache = _Cache.getInstance(redisClient);
}

/** app object so init can be called
 */
const app = {
  init: () => {
    initRedis();
    initCache();
  },
};

module.exports = {app, redisClient, Cache};
