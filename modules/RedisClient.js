/**
 * A class to represent the redis client with promisified methods.
 * Usage:
 * const redis = require('./RedisClient');
 * const redisClient = redis.getInstance();
 *
 * @class
 *
 * @requires     NPM:redis
 */

const redis = require('redis');
const {promisify} = require('util');
const {REDIS_PORT, REDIS_HOST, debug} = require('../config');

/**
 * RedisClient class
 */
class RedisClient {
  /**
     * @constructor
     */
  constructor() {
    this.redisClient;
  }

  /** getInstance returns the instance of redis client or initializes it first
   * @return {object} reference to promisified redis client
   */
  getInstance() {
    if (!this.redisClient) {
      const _client = redis.createClient({
        port: REDIS_PORT,
        host: REDIS_HOST,
      });

      _client.on('ready', () => {
        debug('Redis is ready');
      });

      _client.on('error', (err) => {
        console.error('Redis error', err);
      });

      this.redisClient = {};
      this.redisClient.get = promisify(_client.get).bind(_client);
      this.redisClient.setex = promisify(_client.setex).bind(_client);
      this.redisClient.ttl = promisify(_client.ttl).bind(_client);
      this.redisClient.del = promisify(_client.del).bind(_client);
    }
    return this.redisClient;
  }
}

module.exports = new RedisClient();
